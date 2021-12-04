using Ardalis.Specification;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shared.SeedWork
{
    public interface IRepository<T, TId> : IUnitOfWork where T : BaseEntity<TId>, IAggregateRoot
    {
        Task<T> GetByIdAsync(TId id);
        Task<IEnumerable<T>> ListAsync();
        Task<IEnumerable<T>> ListAsync(params ISpecification<T>[] specs);
        Task<T> AddAsync(T entity);
        Task DeleteAsync(T entity);
        Task<int> CountAsync(params ISpecification<T>[] specs);
    }
}
