using JobProcessing.Application.Queries.GetJobLocations;
using JobProcessing.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Shared.DTO
{
    public class JobResponse
    {
        public string Id { get; set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public string HighlightedDescription { get; private set; }
        public int NumberOfEmployeesRequired { get; private set; }
        public Address Location { get; private set; }
        public JobDurationType JobDurationType { get; private set; }
        public Price Price { get; private set; }
        public JobUrgency Urgency { get; private set; }
        public DateTimeOffset CreateDate { get; private set; }
        public JobStatus JobStatus { get; private set; }
        public int CategoryId { get; private set; }
        public string CategoryName { get; private set; }
        public string EmployerId { get; private set; }
    }

    public class Price {
        public string CurrencyCode { get; private set; }
        public PriceType PriceType { get; private set; }
        public int MinPrice { get; private set; }
        public int MaxPrice { get; private set; }
    }
}
