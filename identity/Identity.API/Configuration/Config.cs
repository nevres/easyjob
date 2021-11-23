using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Identity.API.Configuration
{
    public class Config
    {
        // ApiResources define the apis in your system
        public static IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {
                new ApiResource("jobProcessing", "Job Processing Service"),
                new ApiResource("easyJobAggregate", "Web Easy Job Aggregate"),
                new ApiResource("profileApi", "Profile API"),
                new ApiResource("documentApi", "Document API")
            };
        }

        // Identity resources are data like user ID, name, or email address of a user
        // see: http://docs.identityserver.io/en/release/configuration/resources.html
        public static IEnumerable<IdentityResource> GetResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        // client want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients(Dictionary<string, string> clientsUrl)
        {
            return new List<Client>
            {
                // JavaScript Client
                new Client
                {
                    ClientId = "js",
                    ClientName = "Easy Job SPA OpenId Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris =           { $"{clientsUrl["Spa"]}/authentication/login-callback" },
                    RequireConsent = false,
                    PostLogoutRedirectUris = { $"{clientsUrl["Spa"]}/authentication/logout-callback" },
                    AllowedCorsOrigins =     { $"{clientsUrl["Spa"]}" },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "jobProcessing",
                        "easyJobAggregate",
                        "profileApi", "documentApi"
                    },
                },
                new Client
                {
                    ClientId = "easyJobAggregateApiSwaggerUi",
                    ClientName = "Easy Job Aggregate API swagger UI",
                    ClientSecrets =  {new Secret("easyJobAggregateApiSwaggerUiClientSecret".Sha256())},
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { $"{clientsUrl["EasyJobAggregateApiSwaggerUI"]}/swagger/oauth2-redirect.html" },
                    PostLogoutRedirectUris = { $"{clientsUrl["EasyJobAggregateApiSwaggerUI"]}/swagger/" },
                    
                    AllowedCorsOrigins = {clientsUrl["EasyJobAggregateApiSwaggerUI"]},

                    AllowedScopes =
                    {
                        "jobProcessing",
                        "easyJobAggregate",
                        "profileApi",
                        "documentApi"
                    }
                },
                new Client
                {
                    ClientId = "profileApiSwaggerUi",
                    ClientName = "Profile Api Client",
                    ClientSecrets =  {new Secret("profileApiClientSecret".Sha256())},
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { $"{clientsUrl["profileApiSwaggerUi"]}/swagger/oauth2-redirect.html" },
                    PostLogoutRedirectUris = { $"{clientsUrl["profileApiSwaggerUi"]}/swagger/" },

                    AllowedCorsOrigins = {clientsUrl["profileApiSwaggerUi"] },

                    AllowedScopes =
                    {
                        "profileApi"
                    }
                },
                new Client
                {
                    ClientId = "documentApiSwaggerUi",
                    ClientName = "Document Api Client",
                    ClientSecrets =  {new Secret("documentApiClientSecret".Sha256())},
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { $"{clientsUrl["documentApiSwaggerUi"]}/swagger/oauth2-redirect.html" },
                    PostLogoutRedirectUris = { $"{clientsUrl["documentApiSwaggerUi"]}/swagger/" },

                    AllowedCorsOrigins = {clientsUrl["documentApiSwaggerUi"] },

                    AllowedScopes =
                    {
                        "documentApi"
                    }
                },
            };
        }
    }
}