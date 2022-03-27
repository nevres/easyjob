using JobProcessing.Domain.Entities;
using JobProcessing.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Commands.CreateJob
{
    public class CreateJobDocumentCommand : IRequest<Guid>
    {
        public int JobId { get; set; }
        public Guid DocumentId { get; set; }
        public string DocumentFileName { get; set; }
        public bool IsPrimary { get; set; }
    }
}
