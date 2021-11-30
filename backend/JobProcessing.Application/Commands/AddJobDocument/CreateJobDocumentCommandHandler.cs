using JobProcessing.Application.Commands.CreateJob;
using JobProcessing.Application.Infrastructure.Specifications;
using JobProcessing.Application.Services.Identity;
using JobProcessing.Domain.Entities;
using JobProcessing.Infrastructure.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace JobProcessing.Application.Commands.AddJobDocument
{
    public class CreateJobCommandDocumentHandler : IRequestHandler<CreateJobDocumentCommand, Guid>
    {
        private readonly IJobRepository _jobRepository;
        private readonly IIdentityService _identityService;

        public CreateJobCommandDocumentHandler(IJobRepository jobRepository, IIdentityService identityService)
        {
            _jobRepository = jobRepository;
            _identityService = identityService;
        }

        public async Task<Guid> Handle(CreateJobDocumentCommand request, CancellationToken cancellationToken)
        {
            var job = await _jobRepository.GetByIdAsync(request.JobId, new FullDocumentSpec());
            job.AddDocument(new JobDocument(request.DocumentId, request.DocumentFileName, request.IsPrimary));
            await _jobRepository.SaveChangesAsync();
            return request.DocumentId;
        }
    }
}
