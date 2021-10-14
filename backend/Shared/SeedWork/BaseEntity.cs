using Ardalis.Specification;

namespace Shared.SeedWork
{
    public abstract class BaseEntity<TId>
    {
        public TId Id { get; protected set; }
    }
}
