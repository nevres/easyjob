using Profile.Domain;
using Profile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Profile.Application.Shared
{
    public class UserResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public BusinessType BusinessType { get; set; }
        public string ExternalLink { get; set; }
        public string PhoneNumber { get; set; }

        public static UserResponse MapFromUser(User user) {
            return new UserResponse()
            {
                LastName = user.LastName,
                BusinessType = user.BusinessType,
                Description = user.Description,
                Email = user.Email,
                ExternalLink = user.ExternalLink,
                FirstName = user.FirstName,
                PhoneNumber = user.PhoneNumber
            };
        }
    }
}
