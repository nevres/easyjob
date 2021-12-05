using Shared.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profile.Domain.Entities
{
    public class User : BaseEntity<string>, IAggregateRoot
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public BusinessType BusinessType { get; set; }
        public string ExternalLink { get; set; }
        public string PhoneNumber { get; set; }
    }
}
