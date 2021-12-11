using JobProcessing.Domain.Entities;
using JobProcessing.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Commands.CreateJob
{
    public class CreateJobCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string HighlightedDescription { get; set; }
        public int NumberOfEmployeesRequired { get; set; }
        public JobAddressRequest Location { get; set; }
        public JobDurationType JobDurationType { get; set; }
        public JobPriceRequest Price { get; set; }
        public JobUrgency Urgency { get; set; }
        public int CategoryId { get; set; }
    }

    public class JobAddressRequest
    {
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string AddressLine { get; set; }
        public string Zip { get; set; }
    }

    public class JobPriceRequest
    {
        public string CurrencyCode { get; set; }
        public PriceType PriceType { get; set; }
        public int MinPrice { get; set; }
        public int MaxPrice { get; set; }
    }
}
