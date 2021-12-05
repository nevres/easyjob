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
        public string Name { get; private set; }
        public string Description { get; private set; }
        public string HighlightedDescription { get; private set; }
        public int NumberOfEmployeesRequired { get; private set; }
        public JobAddressRequest Location { get; private set; }
        public JobDurationType JobDurationType { get; private set; }
        public JobPriceRequest Price { get; private set; }
        public JobUrgency Urgency { get; private set; }
        public int CategoryId { get; private set; }
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
        public string CurrencyCode { get; private set; }
        public PriceType PriceType { get; private set; }
        public int MinPrice { get; private set; }
        public int MaxPrice { get; private set; }
    }
}
