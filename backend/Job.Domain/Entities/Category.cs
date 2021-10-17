using Shared.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobProcessing.Domain.Entities
{
    public class Category: BaseEntity<int>
    {
        public string CategoryName { get; set; }
    }
}
