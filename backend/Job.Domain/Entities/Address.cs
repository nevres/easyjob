using Shared.SeedWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace JobProcessing.Domain.Entities
{
    public class Address: BaseEntity<int>
    {
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string AddressLine { get; set; }
        public string Zip { get; set; }
    }
}
