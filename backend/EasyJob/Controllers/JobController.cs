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

        [HttpGet]
        public async Task<JobResponse> GetAsync()
        {
            return await _jobServiceClient.GetJobByIdAsync(new GetJobByIdRequest() { Id = 1 });

        }
    }
}
