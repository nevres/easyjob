using Ardalis.Specification;
using JobProcessing.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobProcessing.Infrastructure.Repositories
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Address>> GetLocationsAsync(params ISpecification<Address>[] specs);
    }
}
