using AutoMapper;
using Document.Application.DTOs;
using Document.Application.Infrastructure;
using Document.Application.Services.Identity;
using Storage.Net.Blobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Document.Application.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IBlobStorage _storage;
        private readonly IDocumentRepository _documentRepository;
        private readonly IIdentityService _identityService;

        public DocumentService(IBlobStorage storage, IDocumentRepository documentRepository, IIdentityService identityService)
        {
            _storage = storage;
            _documentRepository = documentRepository;
            _identityService = identityService;
        }

        public async Task<Models.Document> CreateDocumentAsync(NewDocumentRequest request, CancellationToken cancellationToken)
        {
            var userId = _identityService.GetUserIdentity();
            var newDocument = new Models.Document(userId, request.FileName, request.Content.Length, request.ContentType);
            await _documentRepository.Add(newDocument);

            using var storageTransaction = await _storage.OpenTransactionAsync();
            await _storage.WriteAsync(newDocument.Id.ToString(), request.Content, cancellationToken: cancellationToken);
            
            await storageTransaction.CommitAsync();
            await _documentRepository.SaveChangesAsync();
            return newDocument;
        }
    }
}
