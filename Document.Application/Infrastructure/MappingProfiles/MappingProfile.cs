using AutoMapper;
using Document.Application.DTOs;

namespace JobProcessing.Application.Misc.MappingConfigurations
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<NewDocumentRequest, Document.Application.Models.Document>();
        }
    }

}
