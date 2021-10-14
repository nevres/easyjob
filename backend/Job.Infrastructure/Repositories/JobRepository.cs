using Ardalis.Specification;
using JobProcessing.Domain.Entities;
using Shared.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobProcessing.Infrastructure.Utils;
using Microsoft.EntityFrameworkCore;

namespace JobProcessing.Infrastructure.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly JobContext _db;

        public JobRepository(JobContext db)
        {
            _db = db;
        }
        public Task<Job> AddAsync(Job entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Job entity)
        {
            throw new NotImplementedException();
        }

        public async Task<Job> GetByIdAsync(int id)
        {
            return await Task.FromResult(_db.Jobs.Single(x => x.Id == id));
        }

        public async Task<Job> GetByIdAsync(int id, params ISpecification<Job>[] specs)
        {
            var query = specs.CreateQuery(_db);
            var job = query.Single(x => x.Id == id);
            return await Task.FromResult(job);
        }

        public async Task<List<Job>> ListAsync()
        {
            return await _db.Jobs.ToListAsync();
        }

        public Task<List<Job>> ListAsync(params ISpecification<Job>[] specs)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Job entity)
        {
            throw new NotImplementedException();
        }
    }
}
