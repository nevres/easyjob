using AutoMapper;
using Grpc.Core;
using JobProcessing.Application.Queries.GetCategories;
using JobProcessing.Application.Queries.GetJob;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application
{
    public class JobProcessingService : JobService.JobServiceBase
    {
        private readonly ILogger<JobProcessingService> _logger;
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public JobProcessingService(ILogger<JobProcessingService> logger, IMediator mediator, IMapper mapper)
        {
            _logger = logger;
            _mediator = mediator;
            _mapper = mapper;
        }

        public override Task<JobResponse> GetJobById(GetJobByIdRequest request, ServerCallContext context)
        {
            return _mediator.Send(new GetJobByIdQuery() { Id = request.Id });
        }

        public override async Task<JobResponses> GetJobs(GetJobsQuery request, ServerCallContext context)
        {
            var getJobsQuery = _mapper.Map<Queries.GetJobs.GetJobsQuery>(request);
            var jobs = await _mediator.Send(getJobsQuery);
            var response = new JobResponses();
            foreach (var job in jobs)
            {
                response.Jobs.Add(_mapper.Map<JobResponse>(job));
            }
            return response;
        }

        public override async Task<CategoryResponses> GetJobCategories(Empty request, ServerCallContext context)
        {
            var categories = await _mediator.Send(new GetCategoriesQuery());
            var response = new CategoryResponses();
            foreach (var cat in categories) {
                response.Categories.Add(cat);
            }
            return response;
        }

        public override async Task<Addresses> GetJobLocations(GetJobLocationsQuery request, ServerCallContext context)
        {
            var query = _mapper.Map<Queries.GetJobLocations.GetJobLocationsQuery>(request);
            var locations = await _mediator.Send(query);
            var response = new Addresses();
            foreach (var location in locations)
            {
                response.Address.Add(location);
            }
            return response;
        }

        public override async Task<Id> CreateJob(CreateJobRequest request, ServerCallContext context)
        {
            var query = _mapper.Map<Commands.CreateJobCommand>(request);
            var id = await _mediator.Send(query);
            return new Id() { Id_ = id };
        }
    }
}
