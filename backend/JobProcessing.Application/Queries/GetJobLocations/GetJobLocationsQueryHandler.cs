using Ardalis.Specification;
using AutoMapper;
using JobProcessing.Application.Queries.GetJobLocations;
using JobProcessing.Infrastructure.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace JobProcessing.Application.Queries.GetCategories
{
    public class GetJobLocationsQueryHandler : IRequestHandler<GetJobLocations.GetJobLocationsQuery, IEnumerable<Address>>
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IMapper _mapper;

        public GetJobLocationsQueryHandler(ILocationRepository locationRepository, IMapper mapper)
        {
            _locationRepository = locationRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Address>> Handle(GetJobLocations.GetJobLocationsQuery request, CancellationToken cancellationToken)
        {
            var jobLocations = await _locationRepository.GetLocationsAsync(new AddressFilterSpecification(request));
            return jobLocations.Select(x => _mapper.Map<Address>(x));
        }
    }
}
