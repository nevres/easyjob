using System;
using System.Threading;
using System.Threading.Tasks;

namespace Document.Application.Infrastructure
{
    public interface IUnitOfWork : IDisposable
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
