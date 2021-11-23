using AutoMapper;
using Document.Application.DTOs;
using Document.Application.Infrastructure;
using Document.Application.Services.Identity;
using Storage.Net.Blobs;
using System;
using System.Collections.Generic;
using System.IO;
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

        public async Task<DocumentWithContentResponse> GetDocumentContent(Guid documentId, CancellationToken cancellationToken)
        {
            var documentInfo = await _documentRepository.GetByIdAsync(documentId);
            var stream = await _storage.OpenReadAsync(documentId.ToString(), cancellationToken: cancellationToken);
            return new DocumentWithContentResponse()
            {
                Content = stream,
                ContentType = documentInfo.ContentType,
                CreateDate = documentInfo.CreateDate,
                ModifyDate = documentInfo.ModifyDate,
                CreateUserId = documentInfo.CreateUserId,
                ModifyUserId = documentInfo.ModifyUserId,
                Extension = documentInfo.Extension,
                FileName = documentInfo.FileName,
                Id = documentInfo.Id,
                LengthInBytes = documentInfo.LengthInBytes
            };
        }
    }
}
