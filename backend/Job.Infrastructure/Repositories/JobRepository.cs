﻿using Ardalis.Specification;
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
        public async Task<Job> AddAsync(Job entity)
        {
            _db.Jobs.Add(entity);
            await _db.SaveChangesAsync();
            return entity;
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

        public async Task<IEnumerable<Job>> ListAsync()
        {
            return await _db.Jobs.ToListAsync();
        }

        public async Task<IEnumerable<Job>> ListAsync(params ISpecification<Job>[] specs)
        {
            var query = specs.CreateQuery(_db);
            return await query.ToListAsync();
        }

        public Task UpdateAsync(Job entity)
        {
            throw new NotImplementedException();
        }
    }
}
