using JobProcessing.Application.Commands.CreateJob;
using JobProcessing.Application.Queries.GetCategories;
using JobProcessing.Application.Queries.GetJob;
using JobProcessing.Application.Queries.GetJobLocations;
using JobProcessing.Application.Shared.DTO;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shared.Pagging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController
    {
        private readonly IMediator _mediator;

        public JobController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public Task<JobResponse> GetJobById(int id)
        {
            return _mediator.Send(new GetJobByIdQuery() { Id = id });
        }


        [HttpPost]
        public async Task<int> CreateJob(CreateJobCommand request)
        {
            var id = await _mediator.Send(request);
            return id;
        }

        [HttpGet]
        public async Task<FilteredResult<JobResponse>> GetJobs([FromQuery] Queries.GetJobs.GetJobsQuery request)
        {
            var jobs = await _mediator.Send(request);
            return jobs;
        }

        [HttpPost("{id}/document")]
        public async Task<Guid> CreateJobDocument(int id, CreateJobDocumentCommand request)
        {
            var jobDocumentId = await _mediator.Send(request);
            return jobDocumentId;
        }

        [HttpGet("GetJobCategories")]
        public async Task<IEnumerable<CategoryResponse>> GetJobCategories([FromQuery] GetCategoriesQuery getCategoriesQuery)
        {
            var categories = await _mediator.Send(getCategoriesQuery);
            return categories;
        }


        [HttpGet("GetJobLocations")]
        public async Task<IEnumerable<Address>> GetJobLocations([FromQuery]Queries.GetJobLocations.GetJobLocationsQuery request)
        {
            return await _mediator.Send(request);
        }
    }
}
