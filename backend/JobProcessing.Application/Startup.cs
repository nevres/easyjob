using AutoMapper;
using JobProcessing.Application.Infrastructure.Filters;
using JobProcessing.Application.Misc.MappingConfigurations;
using JobProcessing.Application.Services.Identity;
using JobProcessing.Infrastructure;
using JobProcessing.Infrastructure.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Serialization;

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
            services.AddCustomAuthentication(Configuration);
            services.AddAuthorization();

            AddJobContext<JobContext>(services);

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
                opt.Filters.Add(typeof(HttpGlobalExceptionFilter));
            }).AddJsonOptions(opt =>
                // this is needed because of typescript client generation and nsag: https://github.com/RicoSuter/NJsonSchema/wiki/Enums
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
            );

            services.AddCustomSwagger();
            
            AddAutoMapper(services);

            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
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

                app.UseSwagger().UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Profile API v1");
                    c.OAuthAppName("Job Processing API Swagger UI");
                });
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
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

        public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "JobProcessingApi", Version = "v1" });
                // Nswag.CodeGeneration.Typescript needs this for splitting controllers into client classes
                options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["controller"]}_{e.ActionDescriptor.RouteValues["action"]}");
            });
            return services;
        }
    }
}
