using AutoMapper;
using JobProcessing.Application.Commands;
using JobProcessing.Application.Shared.DTO;
using JobProcessing.Domain.Entities;
using Shared.Automapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Misc.MappingConfigurations
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Address, Queries.GetJobLocations.Address>();
            CreateMap<Domain.ValueTypes.Price, Price>();

            // Job -> JobResponse
            CreateMap<Job, JobResponse>()
                .ForMember(dest => dest.CategoryName, opt =>
                {
                    opt.MapFrom(x => x.Category.CategoryName);
                });

            CreateMap<Domain.Entities.Category, Queries.GetCategories.CategoryResponse>();
        }
    }

}
