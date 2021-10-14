using AutoMapper;
using JobProcessing.Domain.Entities;
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
            CreateMap<Job, JobResponse>()
                .ForMember(dest => dest.Price, opt =>
                {
                    opt.MapFrom(x => new Price() { CurrencyCode = x.Price.CurrencyCode, MaxPrice = x.Price.MaxPrice, MinPrice = x.Price.MinPrice, PriceType = (PriceType)(int)x.Price.PriceType });
                })
                .ForMember(dest => dest.Duration, opt =>
                {
                    opt.MapFrom(x => new JobDuration() { Amount = x.Duration.Amount, DurationType = (JobDurationType)(int)x.Duration.DurationType });
                });

            CreateMap<GetJobsQuery, Queries.GetJobs.GetJobsQuery>();
        }
    }

}
