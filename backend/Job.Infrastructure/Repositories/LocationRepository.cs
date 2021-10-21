using Ardalis.Specification;
using JobProcessing.Domain.Entities;
using JobProcessing.Infrastructure.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobProcessing.Infrastructure.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly JobContext _db;

        public LocationRepository(JobContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Address>> GetLocationsAsync(params ISpecification<Address>[] specs)
        {
            var query = specs.CreateQuery(_db);
            return await query.ToListAsync();
        }
    }
}
