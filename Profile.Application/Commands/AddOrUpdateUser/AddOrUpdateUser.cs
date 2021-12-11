using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Profile.Application.Infrastructure.AuthPolicies;
using Profile.Application.Infrastructure.Identity;
using Profile.Application.Shared;
using Profile.Domain;
using Profile.Domain.Entities;
using Profile.Infrastructure.Repositories;
using Shared.Exceptions;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Profile.Application.Commands.AddOrUpdateUser
{
    public class AddOrUpdateUserCommand : IRequest<UserResponse>
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public BusinessType BusinessType { get; set; }
        public string ExternalLink { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class AddOrUpdateUserCommandHandler : IRequestHandler<AddOrUpdateUserCommand, UserResponse>
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IAuthorizationService _authorizationService;
        private readonly IIdentityService _identityService;

        public AddOrUpdateUserCommandHandler(IProfileRepository profileRepository,
            IHttpContextAccessor httpContext,
            IAuthorizationService authorizationService, IIdentityService identityService)
        {
            _profileRepository = profileRepository;
            _httpContext = httpContext;
            _authorizationService = authorizationService;
            _identityService = identityService;
        }

        public async Task<UserResponse> Handle(AddOrUpdateUserCommand request, CancellationToken cancellationToken)
        {
            var authResult = await _authorizationService.AuthorizeAsync(_httpContext.HttpContext.User, request, new List<IAuthorizationRequirement>() { { new SameUserPolicy() { IdentityService = _identityService } } });
            if (!authResult.Succeeded) { throw new NotAuthorizedException(); };

            var user = await _profileRepository.GetByIdAsync(request.Id);
            if (user == null)
            {
                user = new User(request.Id, request.FirstName, request.LastName, "", request.Description, request.BusinessType, request.ExternalLink, request.PhoneNumber);
                await _profileRepository.AddAsync(user);
            }
            else
            {
                user.Update(request.FirstName, request.LastName, request.ExternalLink, request.PhoneNumber, request.BusinessType, request.Description);
            }
            await _profileRepository.SaveChangesAsync();
            return UserResponse.MapFromUser(user);
        }
    }
}
