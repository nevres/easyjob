using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobProcessing.Application.Queries.GetCategories
{
    public class GetCategoriesQuery : IRequest<IEnumerable<CategoryResponse>> { }
}
