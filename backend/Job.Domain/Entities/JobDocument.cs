using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobProcessing.Domain.Entities
{
    public class JobDocument
    {
        public Guid DocumentId { get; private set; }
        public string DocumentFileName { get; private set; }
        public bool IsPrimary { get; private set; }
        private JobDocument() { }

        public JobDocument(Guid documentId, string documentFileName, bool isPrimary)
        {
            DocumentId = documentId;
            DocumentFileName = documentFileName;
            IsPrimary = isPrimary;
        }
    }
}
