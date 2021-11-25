using System;

namespace JobProcessing.Domain.Exceptions
{
    /// <summary>
    /// Exception type for domain exceptions
    /// </summary>
    public class JobProcessingDomainException : Exception
    {
        public JobProcessingDomainException()
        { }

        public JobProcessingDomainException(string message)
            : base(message)
        { }

        public JobProcessingDomainException(string message, Exception innerException)
            : base(message, innerException)
        { }
    }
}
