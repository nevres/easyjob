using Microsoft.AspNetCore.Authorization;
using Profile.Application.Commands.AddOrUpdateUser;
using Profile.Application.Infrastructure.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Profile.Application.Infrastructure.AuthPolicies
{
    public class EditProfilePolicy : AuthorizationHandler<SameUserPolicy, AddOrUpdateUserCommand>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       SameUserPolicy requirement,
                                                       AddOrUpdateUserCommand resource)
        {
            if (requirement.IdentityService.GetUserIdentity() == resource.Id)
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            context.Fail();
            return Task.CompletedTask;
        }
    }

    public class SameUserPolicy : IAuthorizationRequirement { 
        public IIdentityService IdentityService { get; set; }
    }
}
