using AutoMapper;
using Document.Application.DTOs;

namespace JobProcessing.Application.Misc.MappingConfigurations
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Document.Application.Models.Document, DocumentResponse>();
            CreateMap<Document.Application.Models.Document, DocumentWithContentResponse>()
                .ForMember(x => x.Content, options => options.Ignore());
        }
    }

}
