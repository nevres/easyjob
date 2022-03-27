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
        private readonly IMapper _mapper;

        public DocumentService(IBlobStorage storage, IDocumentRepository documentRepository, 
            IIdentityService identityService, IMapper mapper)
        {
            _storage = storage;
            _documentRepository = documentRepository;
            _identityService = identityService;
            _mapper = mapper;
        }

        public async Task<DocumentResponse> CreateDocumentAsync(NewDocumentRequest request, CancellationToken cancellationToken)
        {
            var userId = _identityService.GetUserIdentity();
            var newDocument = new Models.Document(userId, request.FileName, request.Content.Length, request.ContentType);
            await _documentRepository.Add(newDocument);

            using var storageTransaction = await _storage.OpenTransactionAsync();
            await _storage.WriteAsync(newDocument.Id.ToString(), request.Content, cancellationToken: cancellationToken);
            
            await storageTransaction.CommitAsync();
            await _documentRepository.SaveChangesAsync();
            return _mapper.Map<DocumentResponse>(newDocument);
        }

        public async Task<DocumentWithContentResponse> GetDocumentContent(Guid documentId, CancellationToken cancellationToken)
        {
            var documentInfo = await _documentRepository.GetByIdAsync(documentId);
            var stream = await _storage.OpenReadAsync(documentId.ToString(), cancellationToken: cancellationToken);
            var result = _mapper.Map<DocumentWithContentResponse>(documentInfo);
            result.Content = stream;
            return result;
        }
    }
}
