using Ardalis.Specification;
using Document.Application.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Document.Application.Infrastructure
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly DocumentContext _documentContext;
        private bool _disposedValue;

        public DocumentRepository(DocumentContext documentContext)
        {
            _documentContext = documentContext;
        }

        public async Task<Models.Document> AddAsync(Models.Document entity)
        {
            _documentContext.Add(entity);
            await _documentContext.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Models.Document entity)
        {
            _documentContext.Remove(entity);
            await _documentContext.SaveChangesAsync();
        }

        public async Task<Models.Document> GetByIdAsync(int id, params ISpecification<Models.Document>[] specs)
        {
            var query = specs.CreateQuery(_documentContext);
            return await query.SingleOrDefaultAsync(q => q.Id == id);
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return _documentContext.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    _documentContext.Dispose();
                }
                _disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        public async Task Add(Models.Document document)
        {
            await _documentContext.Documents.AddAsync(document);
        }
    }
}
