using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Queries.GetJobLocations
{
    public class AddressFilterSpecification : Specification<Domain.Entities.Address>
    {
        public AddressFilterSpecification(GetJobLocationsQuery query)
        {
            var sanitizedLocation = query.Location.ToLower();
            Query.Where(x => x.Country.ToLower().Contains(sanitizedLocation) || 
                             x.City.ToLower().Contains(sanitizedLocation)
                );
        }
    }
}
