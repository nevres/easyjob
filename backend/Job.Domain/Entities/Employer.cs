using Ardalis.GuardClauses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobProcessing.Domain.Entities
{
    public class Employer
    {
        public string Identity { get; init; }

        // in the future potential fields: ShowPhoneNumber, ShowEmail, Copy of OwnerType (private, company)

        public Employer(string identity)
        {
            Guard.Against.NullOrWhiteSpace(identity, nameof(identity));
            Identity = identity;
        }
    }
}
