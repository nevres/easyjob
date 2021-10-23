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

        public CreateJobCommandHandler(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<int> Handle(CreateJobCommand request, CancellationToken cancellationToken)
        {
            var jobLocation = new Domain.Entities.Address(request.Location.Latitude, request.Location.Longitude, request.Location.Country, request.Location.City, request.Location.AddressLine, request.Location.Zip);
            var jobDuration = new Domain.ValueTypes.JobDuration(request.Duration.Amount, request.Duration.DurationType);
            var price = new Domain.ValueTypes.Price(request.Price.CurrencyCode, request.Price.MinPrice, request.Price.MaxPrice, request.Price.PriceType);

            var job = new Job(request.Name, request.Description, request.HighlightedDescription, jobLocation, request.NumberOfEmployeesRequired, jobDuration, price, request.Urgency, request.UserId, request.CategoryId);
            await _jobRepository.AddAsync(job);
            return job.Id;
        }
    }
}
