using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Document.Application.DTOs
{
    public class DocumentResponse
    {
        public Guid Id { get; set; }
        public DateTimeOffset CreateDate { get; set; }
        public DateTimeOffset ModifyDate { get; set; }
        public string CreateUserId { get; set; }
        public string ModifyUserId { get; set; }

        public string FileName { get; set; }
        public string Extension { get; set; }
        public long LengthInBytes { get; set; }
        public string ContentType { get; set; }
    }
}
