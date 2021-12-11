//using Google.Protobuf.WellKnownTypes;
//using JobProcessing.Application;
//using Profile;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

using JobProcessing;
using Profile;
using System;

namespace EasyJob.Models.Job
{
    public class ResolvedJobResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string HighlightedDescription { get; set; }
        public int NumberOfEmployeesRequired { get; set; }
        public Address Location { get; set; }
        public JobDurationType JobDurationType { get; set; }
        public Price Price { get; set; }
        public JobUrgency Urgency { get; set; }
        public DateTimeOffset CreateDate { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public UserResponse Employer { get; set; }
    }
}
