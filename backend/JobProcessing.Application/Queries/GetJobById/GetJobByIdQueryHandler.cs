using AutoMapper;
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
        private readonly JobRepository _jobRepository;
        private readonly IMapper _mapper;

        public GetJobByIdQueryHandler(JobRepository jobRepository, IMapper mapper)
        {
            _jobRepository = jobRepository;
            _mapper = mapper;
        }

        public async Task<JobResponse> Handle(GetJobByIdQuery request, CancellationToken cancellationToken)
        {
            try { 
            var job = await _jobRepository.GetByIdAsync(request.Id);
            return _mapper.Map<JobResponse>(job);
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
