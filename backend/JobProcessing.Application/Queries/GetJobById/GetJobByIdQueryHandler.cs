using AutoMapper;
using JobProcessing.Application.Shared.DTO;
using JobProcessing.Infrastructure.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace JobProcessing.Application.Queries.GetJob
{
    public class GetJobByIdQueryHandler : IRequestHandler<GetJobByIdQuery, JobResponse>
    {
        private readonly IJobRepository _jobRepository;
        private readonly IMapper _mapper;

        public GetJobByIdQueryHandler(IJobRepository jobRepository, IMapper mapper)
        {
            _jobRepository = jobRepository;
            _mapper = mapper;
        }

        public async Task<JobResponse> Handle(GetJobByIdQuery request, CancellationToken cancellationToken)
        {
            var job = await _jobRepository.GetByIdAsync(request.Id);
            return _mapper.Map<JobResponse>(job);   
        }
    }
}
