using Ardalis.Specification;
using System;
using System.Threading.Tasks;
using Document.Application.Models;

namespace Document.Application.Infrastructure
{
    public interface IDocumentRepository : IUnitOfWork
    {
        public Task<Models.Document> GetByIdAsync(Guid id, params ISpecification<Models.Document>[] specs);
        public Task Add(Models.Document document);
    }
}
