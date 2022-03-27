using Document.Application.DTOs;
using Document.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Document.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class DocumentController
    {
        private readonly IDocumentService _documentService;

        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpPost]
        public async Task<DocumentResponse> UploadDocument([FromForm] IFormFile[] file, CancellationToken cancellationToken)
        {
            var docRequest = new NewDocumentRequest()
            {
                Content = file.First().OpenReadStream(),
                ContentType = file.First().ContentType,
                FileName = file.First().FileName
            };

            return await _documentService.CreateDocumentAsync(docRequest, cancellationToken);
        }

        [HttpGet("{id}/documentContent")]
        public async Task<IActionResult> GetDocumentContentAsync(Guid id, CancellationToken cancellationToken)
        {
            var documentWithContent = await _documentService.GetDocumentContent(id, cancellationToken);
            var result = new FileStreamResult(documentWithContent.Content, documentWithContent.ContentType);

            return result;
        }
    }
}
