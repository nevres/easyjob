using AutoMapper;
using JobProcessing.Application.Shared.DTO;
using JobProcessing.Infrastructure.Repositories;
using MediatR;
using Shared.Pagging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace JobProcessing.Application.Queries.GetJobs
{
    public class GetJobsQueryHandler : IRequestHandler<GetJobsQuery, FilteredResult<JobResponse>>
    {
        private readonly IJobRepository _jobRepository;
        private readonly IMapper _mapper;

        public GetJobsQueryHandler(IJobRepository jobRepository, IMapper mapper)
        {
            _jobRepository = jobRepository;
            _mapper = mapper;
        }
        public async Task<FilteredResult<JobResponse>> Handle(GetJobs.GetJobsQuery request, CancellationToken cancellationToken)
        {
            var jobs = await _jobRepository.ListAsync(new JobFilterSpecification(request));
            var count = await _jobRepository.CountAsync(new JobFilterSpecification(request, true, true));
            var jobResponses =  jobs.Select(x => _mapper.Map<JobResponse>(x));
            return new FilteredResult<JobResponse>(request, jobResponses, count);
        }
    }
}
