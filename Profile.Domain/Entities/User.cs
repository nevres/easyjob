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
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
        public string Description { get; private set; }
        public BusinessType BusinessType { get; private set; }
        public string ExternalLink { get; private set; }
        public string PhoneNumber { get; private set; }

        // for EF core
        private User() { }

        public User(string userId, string firstName, string lastName, string email, string description, BusinessType businessType, string externalLink, string phoneNumber)
        {
            Id = userId;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Description = description;
            BusinessType = businessType;
            ExternalLink = externalLink;
            PhoneNumber = phoneNumber;
        }

        public void Update(string firstName, string lastName, string externalLink, string phoneNumber, BusinessType businessType, string description)
        {
            FirstName = firstName;
            LastName = lastName;
            ExternalLink = externalLink;
            PhoneNumber = phoneNumber;
            BusinessType = businessType;
            Description = description;
        }
    }
}
