using Grpc.Core;
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

        public JobProcessingService(ILogger<JobProcessingService> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        public override Task<JobResponse> GetJobById(GetJobByIdRequest request, ServerCallContext context)
        {
            return _mediator.Send(new GetJobByIdQuery() { Id = request.Id });
        }
    }
}
