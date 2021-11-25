using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace DocumentProcessing
{
    public partial class DocumentService
    {
        partial void PrepareRequest(HttpClient client, HttpRequestMessage request, string url)
        {
            if (request.Content is not StreamContent streamContent)
            {
                return;
            }

            if (streamContent.Headers.ContentType.MediaType != "multipart/form-data")
            {
                return;
            }

            var boundary = System.Guid.NewGuid().ToString();
            var content = new System.Net.Http.MultipartFormDataContent(boundary);
            content.Headers.Remove("Content-Type");
            content.Headers.TryAddWithoutValidation("Content-Type", "multipart/form-data; boundary=" + boundary);
            content.Add(streamContent, "file", "file");
            request.Content = content;
        }
    }
}
