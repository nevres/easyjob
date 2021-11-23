using Document.Application.DTOs;
using Document.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
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
        public async Task UploadDocument([FromForm] IFormFile[] files, CancellationToken cancellationToken)
        {
            var newDocumentRequests = files.Select(file =>
            {
                return new NewDocumentRequest()
                {
                    Content = file.OpenReadStream(),
                    ContentType = file.ContentType,
                    FileName = file.FileName
                };
            });

            foreach (var request in newDocumentRequests) {
                await _documentService.CreateDocumentAsync(request, cancellationToken);
            }
        }
    }
}
