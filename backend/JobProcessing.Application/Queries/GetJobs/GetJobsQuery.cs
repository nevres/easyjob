using MediatR;
using Shared.Pagging;
using System.Collections.Generic;

namespace JobProcessing.Application.Queries.GetJobs
{
    public record GetJobsQuery(string Name,
        string Description, 
        Price Price,
        IEnumerable<int> CategoryIds,
        int Page, 
        int PageSize, 
        string OrderBy) : BaseFilter(Page, PageSize, OrderBy), IRequest<IEnumerable<JobResponse>>;

    public record Price(string CurrencyCode, Domain.Enums.PriceType PriceType, int MinPrice, int MaxPrice) {
        public bool IsPriceValid()
        {
            var priceProvided = MaxPrice > 0 || MinPrice > 0;
            return !string.IsNullOrEmpty(CurrencyCode) && priceProvided;
        }
    };
}
