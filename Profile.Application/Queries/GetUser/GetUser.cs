using MediatR;
using Profile.Domain.Entities;
using Profile.Infrastructure.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace Profile.Application.Queries.GetUser
{
    public class GetUserQuery : IRequest<User> {
        public string Id { get; set; }
    }

    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, User>
    {
        private readonly IProfileRepository _profileRepository;

        public GetUserQueryHandler(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public Task<User> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            return _profileRepository.GetByIdAsync(request.Id);
        }
    }
}
