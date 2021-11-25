using JobProcessing.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobProcessing.Infrastructure.EntityConfigurations
{
    public class JobDocumentEntityConfiguration : IEntityTypeConfiguration<JobDocument>
    {
        public void Configure(EntityTypeBuilder<JobDocument> builder)
        {
            builder.HasKey(x => x.DocumentId);
            // because we are setting key manually, ef assumes that entry exists already. 
            //https://docs.microsoft.com/en-us/ef/core/what-is-new/ef-core-3.x/breaking-changes#detectchanges-honors-store-generated-key-values
            builder.Property(x => x.DocumentId).ValueGeneratedNever();
        }
    }
}
