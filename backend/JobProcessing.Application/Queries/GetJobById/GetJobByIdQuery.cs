using JobProcessing.Application.Shared.DTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Queries.GetJob
{
    public class GetJobByIdQuery : IRequest<JobResponse> {
        public int Id { get; set; }
    }
}
