using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Document.Application.DTOs
{
    public class DocumentWithContentResponse : DocumentResponse
    {
        public Stream Content { get; set; }
    }
}
