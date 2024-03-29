using MediatR;
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
using Profile.Application.Filters;
using Profile.Application.Infrastructure.AuthPolicies;
using Profile.Application.Infrastructure.Identity;
using Profile.Infrastructure;
using Profile.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Profile.Application
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

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

            services.AddCustomAuthentication(Configuration);
            services.AddAuthorization();

            services.AddProfileContext<ProfileContext>(Configuration);

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddJsonOptions(opt =>
                // this is needed because of typescript client generation and nsag: https://github.com/RicoSuter/NJsonSchema/wiki/Enums
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
            );

            services.AddScoped<IProfileRepository, ProfileRepository>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IIdentityService, IdentityService>();

            services.AddCustomSwagger(Configuration);

            services.AddMediatR(typeof(Startup));

            services.AddAppAuthPolicies();
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
                    c.OAuthClientId("profileApiSwaggerUi");
                    c.OAuthClientSecret("profileApiClientSecret");
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
            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    static class ConfigureServicesExtensions {
        public static IServiceCollection AddProfileContext<T>(this IServiceCollection services, IConfiguration configuration) where T : DbContext
        {
            services.AddDbContext<T>(opt =>
                opt
                .UseNpgsql(configuration.GetConnectionString("EasyJobDb"))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll));
            return services;
        }

        public static IServiceCollection AddCustomSwagger(this IServiceCollection services, IConfiguration configuration)
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
                            AuthorizationUrl = new Uri($"{configuration.GetValue<string>("urls:identity")}/connect/authorize"),
                            TokenUrl = new Uri($"{configuration.GetValue<string>("urls:identity")}/connect/token"),

                            Scopes = new Dictionary<string, string>()
                            {
                                { "profileApi", "Profile API" }
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
                    ] = new[] { "profileApi" }
                };

                options.AddSecurityRequirement(securityRequirement);

                options.OperationFilter<AuthorizeCheckOperationFilter>();
            });
            return services;
        }

        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
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
                options.Audience = "profileApi";
            });
            return services;
        }

        public static IServiceCollection AddAppAuthPolicies(this IServiceCollection services) {
            services.AddAuthorization(options =>
            {
                options.AddPolicy(nameof(EditProfilePolicy), policy =>
                    policy.Requirements.Add(new SameUserPolicy()));
            });

            services.AddSingleton<IAuthorizationHandler, EditProfilePolicy>();
            return services;
        }
    }
}
