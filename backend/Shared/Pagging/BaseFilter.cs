using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Pagging
{
    public record BaseFilter(int Page, int PageSize, string OrderBy);
}
