﻿using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Identity.API.Factories
{
    public class PersistedGrantDbContextFactory : IDesignTimeDbContextFactory<PersistedGrantDbContext>
    {
        public PersistedGrantDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
               .AddJsonFile("appsettings.json")
               .AddEnvironmentVariables()
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<PersistedGrantDbContext>();
            var operationOptions = new OperationalStoreOptions();
            operationOptions.DefaultSchema = "identity";

            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Uid=postgres;Pwd=Pin.1234;Database=postgres",
                npgsqlOptionsAction: o => o.MigrationsAssembly("Identity.API"));

            return new PersistedGrantDbContext(optionsBuilder.Options, operationOptions);
        }
    }
}