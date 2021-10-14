using Ardalis.Specification;
using JobProcessing.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Shared.Pagging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Queries.GetJobs
{
    public class JobFilterSpecification : Specification<Job>
    {
        public JobFilterSpecification(GetJobsQuery filter)
        {
            if (!string.IsNullOrEmpty(filter.OrderBy))
            {
                Query.OrderBy(x => EF.Property<object>(x, filter.OrderBy));
            }
            else {
                Query.OrderBy(x => x.Id);
            }

            Query.Skip(PaginationHelper.CalculateSkip(filter))
                     .Take(PaginationHelper.CalculateTake(filter));

            if (!string.IsNullOrEmpty(filter.Name))
                Query.Where(x => x.Name.ToLower().Contains(filter.Name.ToLower()));

            if (!string.IsNullOrEmpty(filter.Description))
                Query.Where(x => x.Description.ToLower().Contains(filter.Description.ToLower()));
        }
    }
}
