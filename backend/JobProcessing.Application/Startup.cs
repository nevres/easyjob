using AutoMapper;
using JobProcessing.Application.Misc.MappingConfigurations;
using JobProcessing.Application.Services.Identity;
using JobProcessing.Infrastructure;
using JobProcessing.Infrastructure.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace JobProcessing.Application
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            _environment = environment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddGrpc();
            services.AddCustomAuthentication(Configuration);
            services.AddAuthorization();
            AddJobContext<JobContext>(services);
            AddAutoMapper(services);
            
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IIdentityService, IdentityService>();

            services.AddScoped<IJobRepository, JobRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddMediatR(typeof(Startup));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints((Action<Microsoft.AspNetCore.Routing.IEndpointRouteBuilder>)(endpoints =>
            {
                GrpcEndpointRouteBuilderExtensions.MapGrpcService<JobProcessingService>(endpoints);

                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
                });
            }));
        }

        private void AddJobContext<T>(IServiceCollection services) where T : DbContext
        {
            services.AddDbContext<T>(opt =>
                opt
                .UseNpgsql(Configuration.GetConnectionString("EasyJobDb"))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll));
        }

        private void AddAutoMapper(IServiceCollection services)
        {
            // Auto Mapper Configurations
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            if (_environment.IsDevelopment())
            {
                mapperConfig.AssertConfigurationIsValid();
            }

            IMapper mapper = mapperConfig.CreateMapper();
            
            services.AddSingleton(mapper);
        }
    }

    static class CustomExtensionsMethods
    {

        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            // prevent from mapping "sub" claim to nameidentifier.
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("sub");

            var identityUrl = configuration.GetValue<string>("IdentityUrl");

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = identityUrl;
                options.RequireHttpsMetadata = false;
                options.Audience = "jobProcessing";
            });

            return services;
        }
    }
}
