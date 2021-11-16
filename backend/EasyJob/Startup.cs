using EasyJob.Filters;
using EasyJob.Infrastructure;
using EasyJob.Models;
using EasyJob.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Serialization;
using static JobProcessing.Application.JobService;

namespace EasyJob
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:3000")
                                        .AllowAnyMethod()
                                        .AllowAnyHeader()
                                        .AllowCredentials();
                                  });
            });

            AddGrpcServices(services);

            services.AddTransient<IIdentityParser<ApplicationUser>, IdentityParser>();

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddJsonOptions(opt =>
                    // this is needed because of typescript client generation and nsag: https://github.com/RicoSuter/NJsonSchema/wiki/Enums
                    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
                    );

            AddCustomSwagger(services);

            AddCustomAuthentication(services, Configuration);
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger().UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "EasyJob v1");
                    c.OAuthClientId("easyJobAggregateApiSwaggerUi");
                    c.OAuthClientSecret("easyJobAggregateApiSwaggerUiClientSecret");
                    c.OAuthRealm(string.Empty);
                    c.OAuthAppName("web shopping bff Swagger UI");
                });

            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void AddGrpcServices(IServiceCollection services)
        {
            services.AddTransient<GrpcExceptionInterceptor>();

            //register delegating handlers
            services.AddTransient<HttpClientAuthorizationDelegatingHandler>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddGrpcClient<JobServiceClient>((services, options) =>
            {
                var grpcUrl = Configuration.GetValue<string>("urls:grpcJob");
                options.Address = new Uri(grpcUrl);
            }).AddHttpMessageHandler<HttpClientAuthorizationDelegatingHandler>()
            .AddInterceptor<GrpcExceptionInterceptor>();
        }

        private static void AddCustomAuthentication(IServiceCollection services, IConfiguration configuration)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("sub");

            var identityUrl = configuration.GetValue<string>("urls:identity");
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(options =>
            {
                options.Authority = identityUrl;
                options.RequireHttpsMetadata = false;
                options.Audience = "easyJobAggregate";
            });
        }

        private void AddCustomSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "EasyJob", Version = "v1" });
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
                                { "easyJobAggregate", "Web Easy Job Aggregate" },
                                { "jobProcessing", "Job Processing Service" }
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
                    ] = new[] { "easyJobAggregate", "jobProcessing" }
                };

                options.AddSecurityRequirement(securityRequirement);

                options.OperationFilter<AuthorizeCheckOperationFilter>();
            });
        }
    }
}
