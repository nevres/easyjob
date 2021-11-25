using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Document.Application.DTOs
{
    public class FileModel
    {
        public IFormFile File { get; set; }
    }
}
