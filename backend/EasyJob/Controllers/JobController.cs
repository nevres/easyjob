using EasyJob.Models;
using EasyJob.Services;
using JobProcessing.Application;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static JobProcessing.Application.JobService;

namespace EasyJob.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : ControllerBase
    {
        private readonly ILogger<JobController> _logger;
        private readonly JobServiceClient _jobServiceClient;
        private readonly IIdentityParser<ApplicationUser> _identityParser;

        public JobController(ILogger<JobController> logger,
                             JobServiceClient jobServiceClient,
                             IIdentityParser<ApplicationUser> identityParser)
        {
            _logger = logger;
            _jobServiceClient = jobServiceClient;
            _identityParser = identityParser;
        }

        [HttpGet("{id}")]
        public async Task<Models.ResolvedJobResponse> GetAsync(int id)
        {
            var job = await _jobServiceClient.GetJobByIdAsync(new GetJobByIdRequest() { Id = 1 });
            return CreateJobResponse(job);
        }

        [HttpGet]
        public async Task<IEnumerable<Models.ResolvedJobResponse>> GetjobsAsync([FromQuery] GetJobsQuery query)
        {
            var jobServiceResponse = await _jobServiceClient.GetJobsAsync(query);
            return jobServiceResponse.Jobs.Select(x => CreateJobResponse(x));
        }

        [HttpGet("categories")]
        public async Task<List<CategoryResponse>> GetJobCategories()
        {
            var jobServiceResponse = await _jobServiceClient.GetJobCategoriesAsync(new Empty());
            return jobServiceResponse.Categories.ToList();
        }

        [HttpGet("locations")]
        public async Task<List<Address>> GetJobLocations([FromQuery] GetJobLocationsQuery query)
        {
            var jobServiceResponse = await _jobServiceClient.GetJobLocationsAsync(query);
            return jobServiceResponse.Address.ToList();
        }

        [HttpPost]
        public async Task<int> CreateJob([FromQuery] CreateJobRequest query)
        {
            var jobServiceResponse = await _jobServiceClient.CreateJobAsync(query);
            return jobServiceResponse.Id_;
        }

        private Models.ResolvedJobResponse CreateJobResponse(JobProcessing.Application.JobResponse job)
        {
            var employer = _identityParser.Parse(HttpContext.User);
            var resolvedJobResponse = new ResolvedJobResponse()
            {
                CategoryId = job.CategoryId,
                CategoryName = job.CategoryName,
                CreateDate = job.CreateDate,
                Description = job.Description,
                Employer = employer,
                HighlightedDescription = job.HighlightedDescription,
                Id = job.Id,
                JobDurationType = job.JobDurationType,
                Location = job.Location,
                Name = job.Name,
                NumberOfEmployeesRequired = job.NumberOfEmployeesRequired,
                Price = job.Price,
                Urgency = job.Urgency
            };
            return resolvedJobResponse;
        }
    }
}
