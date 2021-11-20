using EasyJob.Models;
using Profile;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace EasyJob.Services
{
    public class IdentityParser : IIdentityParser<User>
    {
        public User Parse(IPrincipal principal)
        {
            // Pattern matching 'is' expression
            // assigns "claims" if "principal" is a "ClaimsPrincipal"
            if (principal is ClaimsPrincipal claims)
            {
                return new User
                {
                    //Email = claims.Claims.FirstOrDefault(x => x.Type == "email")?.Value ?? "",
                    Id = claims.Claims.FirstOrDefault(x => x.Type == "sub")?.Value ?? "",
                };
            }
            throw new ArgumentException(message: "The principal must be a ClaimsPrincipal", paramName: nameof(principal));
        }
    }
}


