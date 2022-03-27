using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Document.Application.DTOs
{
    public class NewDocumentRequest
    {
        public string FileName { get; set; }
        public Stream Content { get; set; }
        public string ContentType { get; set; }
	}
}
