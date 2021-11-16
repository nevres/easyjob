using EasyJob.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace EasyJob.Services
{
    public class IdentityParser : IIdentityParser<ApplicationUser>
    {
        public ApplicationUser Parse(IPrincipal principal)
        {
            // Pattern matching 'is' expression
            // assigns "claims" if "principal" is a "ClaimsPrincipal"
            if (principal is ClaimsPrincipal claims)
            {
                return new ApplicationUser
                {

                    City = claims.Claims.FirstOrDefault(x => x.Type == "address_city")?.Value ?? "",
                    Country = claims.Claims.FirstOrDefault(x => x.Type == "address_country")?.Value ?? "",
                    Email = claims.Claims.FirstOrDefault(x => x.Type == "email")?.Value ?? "",
                    Id = claims.Claims.FirstOrDefault(x => x.Type == "sub")?.Value ?? "",
                    LastName = claims.Claims.FirstOrDefault(x => x.Type == "last_name")?.Value ?? "",
                    Name = claims.Claims.FirstOrDefault(x => x.Type == "name")?.Value ?? "",
                    Street = claims.Claims.FirstOrDefault(x => x.Type == "address_street")?.Value ?? "",
                    ZipCode = claims.Claims.FirstOrDefault(x => x.Type == "address_zip_code")?.Value ?? ""
                };
            }
            throw new ArgumentException(message: "The principal must be a ClaimsPrincipal", paramName: nameof(principal));
        }
    }
}


