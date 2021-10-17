using JobProcessing.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobProcessing.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly JobContext _jobContext;

        public CategoryRepository(JobContext jobContext)
        {
            _jobContext = jobContext;
        }

        public async Task<IEnumerable<Category>> GetJobCategoriesAsync()
        {
            return await _jobContext.Categories.ToListAsync();
        }
    }
}
