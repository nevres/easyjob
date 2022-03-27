using System;
using System.IO;

namespace Document.Application.Models
{
    public class Document
    {
        private Document()
        {
            // For EF Core
        }
        public Guid Id { get; private set; }

        public DateTimeOffset CreateDate { get; private set; }
        public DateTimeOffset ModifyDate { get; private set; }
        public string CreateUserId { get; private set; }
        public string ModifyUserId { get; private set; }

        public string FileName { get; private set; }
        public string Extension { get; private set; }
        public long LengthInBytes { get; private set; }
        public string ContentType { get; private set; }

        public Document(string createUserId, string fileName, long lengthInBytes, string contentType)
        {
            Id = Guid.NewGuid();
            FileName = fileName;
            Extension = Path.GetFileName(fileName);
            LengthInBytes = lengthInBytes;
            ContentType = contentType;
            CreateUserId = createUserId;
            ModifyUserId = createUserId;
            CreateDate = DateTimeOffset.UtcNow;
            ModifyDate = DateTimeOffset.UtcNow;
        }
    }
}
