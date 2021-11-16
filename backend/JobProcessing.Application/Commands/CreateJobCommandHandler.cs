using JobProcessing.Application.Services.Identity;
using JobProcessing.Domain.Entities;
using JobProcessing.Infrastructure.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace JobProcessing.Application.Commands
{
    public class CreateJobCommandHandler : IRequestHandler<CreateJobCommand, int>
    {
        private readonly IJobRepository _jobRepository;
        private readonly IIdentityService _identityService;

        public CreateJobCommandHandler(IJobRepository jobRepository, IIdentityService identityService)
        {
            _jobRepository = jobRepository;
            _identityService = identityService;
        }

        public async Task<int> Handle(CreateJobCommand request, CancellationToken cancellationToken)
        {
            var currentUserId = _identityService.GetUserIdentity();
            var jobLocation = new Domain.Entities.Address(request.Location.Latitude, request.Location.Longitude, request.Location.Country, request.Location.City, request.Location.AddressLine, request.Location.Zip);
            var price = new Domain.ValueTypes.Price(request.Price.CurrencyCode, request.Price.MinPrice, request.Price.MaxPrice, request.Price.PriceType);
            var employer = new Employer(currentUserId);
            var job = new Job(request.Name, request.Description, request.HighlightedDescription, jobLocation, request.NumberOfEmployeesRequired,
                request.JobDurationType, price, request.Urgency, request.CategoryId, employer);

            await _jobRepository.AddAsync(job);
            return job.Id;
        }
    }
}
