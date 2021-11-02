using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Queries.GetJobLocations
{
    public class GetJobLocationsQuery : IRequest<IEnumerable<Address>> {
        public string Location { get; set; }
    }
}
