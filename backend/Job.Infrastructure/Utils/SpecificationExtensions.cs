using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace JobProcessing.Infrastructure.Utils
{
    public static class SpecificationExtensions
    {
        public static IQueryable<T> CreateQuery<T>(this ISpecification<T>[] specifications, DbContext dbContext) where T : class
        {
            IQueryable<T> query = dbContext.Set<T>().AsQueryable();
            var specificationEvaluator = new SpecificationEvaluator();
            foreach (var spec in specifications)
            {
                query = specificationEvaluator.GetQuery(query, spec);
            }
            return query;
        }
    }
}
