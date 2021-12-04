using Ardalis.Specification;
using JobProcessing.Domain.Entities;
using Shared.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobProcessing.Infrastructure.Utils;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace JobProcessing.Infrastructure.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly JobContext _db;
        private bool _disposedValue;

        public JobRepository(JobContext db)
        {
            _db = db;
        }
        public async Task<Job> AddAsync(Job entity)
        {
            _db.Jobs.Add(entity);
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

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _db.SaveChangesAsync(cancellationToken);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects)
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                _disposedValue = true;
            }
        }

        // // TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
        // ~JobRepository()
        // {
        //     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        //     Dispose(disposing: false);
        // }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        public Task<int> CountAsync(params ISpecification<Job>[] specs)
        {
            var query = specs.CreateQuery(_db);
            return query.CountAsync();
        }
    }
}
