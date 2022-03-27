using AutoMapper;
using Document.Application.Filters;
using Document.Application.Infrastructure;
using Document.Application.Models;
using Document.Application.Services;
using Document.Application.Services.Identity;
using JobProcessing.Application.Misc.MappingConfigurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Storage.Net;
using Storage.Net.Blobs;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Document.Application
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            _environment = environment;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            AddCustomAuthentication(services, Configuration);
            services.AddAuthorization();

            AddDocumentContext<DocumentContext>(services);
            
            AddCustomSwagger(services);
            
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddJsonOptions(opt =>
                // this is needed because of typescript client generation and nsag: https://github.com/RicoSuter/NJsonSchema/wiki/Enums
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
            );

            var storagePath = Configuration.GetValue<string>("storage:directory");
            services.AddSingleton<IBlobStorage>(StorageFactory.Blobs.DirectoryFiles(storagePath));

            services.AddScoped<IDocumentRepository, DocumentRepository>();
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddTransient<IDocumentService, DocumentService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            AddAutoMapper(services);

            services.Configure<SwaggerOptions>(c => c.SerializeAsV2 = true);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger(opt => opt.SerializeAsV2 = true).UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Document API v1");
                    c.OAuthClientId("documentApiSwaggerUi");
                    c.OAuthClientSecret("documentApiClientSecret");
                    c.OAuthRealm(string.Empty);
                    c.OAuthAppName("Profile API Swagger UI");
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

        private void AddDocumentContext<T>(IServiceCollection services) where T : DbContext
        {
            services.AddDbContext<T>(opt =>
                opt
                .UseNpgsql(Configuration.GetConnectionString("EasyJobDb"))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll));
        }

        private void AddCustomSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "ProfileApplication", Version = "v1" });
                // Nswag.CodeGeneration.Typescript needs this for splitting controllers into client classes
                options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["controller"]}_{e.ActionDescriptor.RouteValues["action"]}");

                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows()
                    {
                        AuthorizationCode = new OpenApiOAuthFlow()
                        {
                            AuthorizationUrl = new Uri($"{Configuration.GetValue<string>("urls:identity")}/connect/authorize"),
                            TokenUrl = new Uri($"{Configuration.GetValue<string>("urls:identity")}/connect/token"),

                            Scopes = new Dictionary<string, string>()
                            {
                                { "documentApi", "Profile API" }
                            }
                        }
                    }
                });


                var securityRequirement = new OpenApiSecurityRequirement
                {
                    [
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "oauth2"
                            }
                        }
                    ] = new[] { "documentApi" }
                };

                options.AddSecurityRequirement(securityRequirement);

                options.OperationFilter<AuthorizeCheckOperationFilter>();
            });
        }

        private void AddCustomAuthentication(IServiceCollection services, IConfiguration configuration)
        {
            // prevent from mapping "sub" claim to nameidentifier.
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("sub");

            var identityUrl = configuration.GetValue<string>("urls:identity");

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = identityUrl;
                options.RequireHttpsMetadata = false;
                options.Audience = "documentApi";
            });
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
}
