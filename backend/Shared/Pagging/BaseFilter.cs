using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Pagging
{
    public class BaseFilter {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string OrderBy { get; set; }
    }
}
