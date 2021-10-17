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

        public JobController(ILogger<JobController> logger, JobServiceClient jobServiceClient)
        {
            _logger = logger;
            _jobServiceClient = jobServiceClient;
        }

        [HttpGet("{id}")]
        public async Task<JobResponse> GetAsync(int id)
        {
            return await _jobServiceClient.GetJobByIdAsync(new GetJobByIdRequest() { Id = 1 });
        }
        
        [HttpGet]
        public async Task<List<JobResponse>> GetjobsAsync([FromQuery]GetJobsQuery query)
        {
            var jobServiceResponse = await _jobServiceClient.GetJobsAsync(query);
            return jobServiceResponse.Jobs.ToList();
        }

        [HttpGet("categories")]
        public async Task<List<CategoryResponse>> GetJobCategories()
        {
            var jobServiceResponse = await _jobServiceClient.GetJobCategoriesAsync(new Empty());
            return jobServiceResponse.Categories.ToList();
        }
    }
}
