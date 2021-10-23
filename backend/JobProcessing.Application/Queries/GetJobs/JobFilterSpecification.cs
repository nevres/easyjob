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

            if (filter.Price?.IsPriceValid() == true)
            {
                Query.Where(x => x.Price.CurrencyCode == filter.Price.CurrencyCode &&
                            (filter.Price.MinPrice <=0 || x.Price.MinPrice >= filter.Price.MinPrice) &&
                            (filter.Price.MaxPrice <=0 || x.Price.MaxPrice <= filter.Price.MaxPrice )&&
                            (int)x.Price.PriceType == (int)filter.Price.PriceType
                    );
            }

            if (filter.CategoryIds?.Any() == true) {
                Query.Where(x => filter.CategoryIds.Contains(x.CategoryId));
            }

            Query.Skip(PaginationHelper.CalculateSkip(filter))
                     .Take(PaginationHelper.CalculateTake(filter));

            if (!string.IsNullOrEmpty(filter.Name))
                Query.Where(x => x.Name.ToLower().Contains(filter.Name.ToLower()));

            if (!string.IsNullOrEmpty(filter.Description))
                Query.Where(x => x.Description.ToLower().Contains(filter.Description.ToLower()) || x.HighlightedDescription.ToLower().Contains(filter.Description.ToLower()));

            if (filter.JobDurationType.HasValue) {
                switch (filter.JobDurationType) {
                    case Domain.Enums.JobDurationType.LessThanADay:
                        Query.Where(x => x.JobDurationType == Domain.Enums.JobDurationType.LessThanADay);
                        break;
                    case Domain.Enums.JobDurationType.LessThanAWeek:
                        Query.Where(x => x.JobDurationType == Domain.Enums.JobDurationType.LessThanADay || x.JobDurationType == Domain.Enums.JobDurationType.LessThanAWeek);
                        break;
                    case Domain.Enums.JobDurationType.LessThanAMonth:
                        Query.Where(x => x.JobDurationType == Domain.Enums.JobDurationType.LessThanADay || x.JobDurationType == Domain.Enums.JobDurationType.LessThanAWeek || x.JobDurationType == Domain.Enums.JobDurationType.LessThanAMonth);
                        break;
                    case Domain.Enums.JobDurationType.OneToSixMonths:
                        Query.Where(x => x.JobDurationType == Domain.Enums.JobDurationType.OneToSixMonths);
                        break;
                    case Domain.Enums.JobDurationType.MoreThanSixMonths:
                        Query.Where(x => x.JobDurationType == Domain.Enums.JobDurationType.MoreThanSixMonths);
                        break;
                }
            }

            Query.Include(x => x.Location).Include(x => x.Category);
        }
    }
}
