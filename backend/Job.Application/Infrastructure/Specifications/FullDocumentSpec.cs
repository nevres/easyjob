using Ardalis.Specification;
using JobProcessing.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Infrastructure.Specifications
{
    public class FullDocumentSpec : Specification<Job>
    {
        public FullDocumentSpec()
        {
            Query.Include(x => x.Employer).Include(x => x.JobDocuments).Include(x => x.Location);
        }
    }
}
