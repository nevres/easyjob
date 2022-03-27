using Document.Application.DTOs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Document.Application.Services
{
    public interface IDocumentService
    {
        Task<DocumentResponse> CreateDocumentAsync(NewDocumentRequest request, CancellationToken cancellationToken);
        Task<DocumentWithContentResponse> GetDocumentContent(Guid documentId, CancellationToken cancellationToken);
    }
}
