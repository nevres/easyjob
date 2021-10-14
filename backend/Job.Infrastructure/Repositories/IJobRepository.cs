using Ardalis.Specification;
using JobProcessing.Domain.Entities;
using Shared.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobProcessing.Infrastructure.Repositories
{
    public interface IJobRepository: IRepository<Job, int>
    {
        public Task<Job> GetByIdAsync(int id, params ISpecification<Job>[] specs);
    }
}
