using EasyJob.Models;
using JobProcessing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Profile;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyJob.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : ControllerBase
    {
        private readonly ILogger<JobController> _logger;
        private readonly IProfileApi _profileApi;
        private readonly IJobProcessingApi _jobProcessingApi;

        public JobController(ILogger<JobController> logger,
                             IProfileApi profileApi, IJobProcessingApi jobProcessingApi)
        {
            _logger = logger;
            _profileApi = profileApi;
            _jobProcessingApi = jobProcessingApi;
        }

        [HttpGet("{id}")]
        public async Task<ResolvedJobResponse> GetAsync(int id)
        {
            var job = await _jobProcessingApi.GetJobByIdAsync(id);
            return await CreateJobResponseAsync(job);
        }

        [HttpGet]
        public async Task<IEnumerable<Models.ResolvedJobResponse>> GetjobsAsync([FromQuery] string name,
            [FromQuery] string description,
            [FromQuery] string price_CurrencyCode,
            [FromQuery] PriceType? price_PriceType,
            [FromQuery] int? price_MinPrice,
            [FromQuery] int? price_MaxPrice,
            [FromQuery] System.Collections.Generic.IEnumerable<int> categoryIds,
            [FromQuery] JobDurationType? jobDurationType,
            [FromQuery] string city,
            [FromQuery] int? page,
            [FromQuery] int? pageSize,
            [FromQuery] string orderBy)
        {
            var jobServiceResponse = await _jobProcessingApi.GetJobsAsync(name, description, price_CurrencyCode, price_PriceType, price_MinPrice, price_MaxPrice, categoryIds, jobDurationType, city, page, pageSize, orderBy);
            return await Task.WhenAll(jobServiceResponse.Select(async x => await CreateJobResponseAsync(x)));
        }

        [HttpGet("categories")]
        public async Task<IEnumerable<CategoryResponse>> GetJobCategories()
        {
            return await _jobProcessingApi.GetJobCategoriesAsync(new GetCategoriesQuery());
        }

        [HttpGet("locations")]
        public async Task<IEnumerable<Address>> GetJobLocations([FromQuery] string location)
        {
            return await _jobProcessingApi.GetJobLocationsAsync(location);
        }

        [HttpPost]
        public async Task<int> CreateJob([FromQuery] CreateJobCommand query)
        {
            return await _jobProcessingApi.CreateJobAsync(query);
        }

        [HttpGet("profile/{id}")]
        public async Task<User> GetProfileAsync(int id)
        {
            return await _profileApi.GetAsync("1");
        }

        private async Task<ResolvedJobResponse> CreateJobResponseAsync(JobResponse job)
        {
            var employer = await _profileApi.GetAsync(job.EmployerId);

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
