using Shared.SeedWork;

namespace JobProcessing.Domain.Entities
{
    public class Address : BaseEntity<int>
    {
        public Address(float? latitude, float? longitude, string country, string city, string addressLine, string zip)
        {
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Country = country;
            this.City = city;
            this.AddressLine = addressLine;
            this.Zip = zip;
        }

        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string AddressLine { get; set; }
        public string Zip { get; set; }
    }
}
