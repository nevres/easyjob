using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
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
                                      builder.WithOrigins("http://localhost:3000");
                                  });
            });
            AddGrpcServices(services);
            services.AddControllers().AddJsonOptions(opt =>
            // this is needed because of typescript client generation and nsag: https://github.com/RicoSuter/NJsonSchema/wiki/Enums
                    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
                    );

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EasyJob", Version = "v1" });
                // Nswag.CodeGeneration.Typescript needs this for splitting controllers into client classes
                c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["controller"]}_{e.ActionDescriptor.RouteValues["action"]}");
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EasyJob v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseCors(MyAllowSpecificOrigins);
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void AddGrpcServices(IServiceCollection services)
        {
            services.AddGrpcClient<JobServiceClient>((services, options) =>
            {
                var grpcUrl = Configuration.GetValue<string>("urls:grpcJob");
                options.Address = new Uri(grpcUrl);
            });
        }
    }
}
