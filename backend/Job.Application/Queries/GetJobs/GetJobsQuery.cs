using JobProcessing.Application.Shared.DTO;
using MediatR;
using Shared.Pagging;
using System.Collections.Generic;

namespace JobProcessing.Application.Queries.GetJobs
{
    public class GetJobsQuery: PaggingParams, IRequest<FilteredResult<JobResponse>> {
        public string Name { get; set; }
        public string Description { get; set; }
        public PriceQuery Price { get; set; }
        public IEnumerable<int> CategoryIds { get; set; }
        public Domain.Enums.JobDurationType? JobDurationType { get; set; }
        public string City { get; set; }
    }

    public class PriceQuery {
        public string CurrencyCode { get; set; }
        public Domain.Enums.PriceType PriceType { get; set; }
        public int MinPrice { get; set; }
        public int MaxPrice { get; set; }

        public bool IsPriceValid()
        {
            var priceProvided = MaxPrice > 0 || MinPrice > 0;
            return !string.IsNullOrEmpty(CurrencyCode) && priceProvided;
        }
    };
}
