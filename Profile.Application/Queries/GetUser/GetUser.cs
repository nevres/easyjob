using MediatR;
using Profile.Application.Shared;
using Profile.Domain.Entities;
using Profile.Infrastructure.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace Profile.Application.Queries.GetUser
{
    public class GetUserQuery : IRequest<UserResponse> {
        public string Id { get; set; }
    }

    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserResponse>
    {
        private readonly IProfileRepository _profileRepository;

        public GetUserQueryHandler(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public async Task<UserResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _profileRepository.GetByIdAsync(request.Id);
            return UserResponse.MapFromUser(user);
        }
    }
}
