using AutoMapper;
using Google.Protobuf.WellKnownTypes;
using JobProcessing.Application.Commands;
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
            CreateMap<DateTimeOffset, Timestamp>().ConvertUsing(new Proto3TimeStampDateConverter());

            CreateMap<Domain.Entities.Address, Address>();
            CreateMap<GetJobLocationsQuery, Queries.GetJobLocations.GetJobLocationsQuery>();

            CreateMap<JobAddressRequest, Commands.JobAddressRequest>();
            CreateMap<CreateJobRequest, CreateJobCommand>();
            CreateMap<Price, JobPriceRequest>();

            CreateMap<GetJobsQuery, Queries.GetJobs.GetJobsQuery>()
                .MapRecordMember(dest => dest.Price, x => new Queries.GetJobs.Price(x.Price.CurrencyCode, (Domain.Enums.PriceType)(int)x.Price.PriceType, x.Price.MinPrice, x.Price.MaxPrice));

            // Job -> JobResponse
            CreateMap<Job, JobResponse>()
                .ForMember(dest => dest.Price, opt =>
                {
                    opt.MapFrom(x => new Price() { CurrencyCode = x.Price.CurrencyCode, MaxPrice = x.Price.MaxPrice, MinPrice = x.Price.MinPrice, PriceType = (PriceType)(int)x.Price.PriceType });
                })
                .ForMember(dest => dest.CategoryName, opt =>
                {
                    opt.MapFrom(x => x.Category.CategoryName);
                });

            CreateMap<Category, CategoryResponse>();
        }
    }

}
