using Ardalis.GuardClauses;
using JobProcessing.Domain.Enums;
using JobProcessing.Domain.ValueTypes;
using Shared.SeedWork;
using System;

namespace JobProcessing.Domain.Entities
{
    public class Job : BaseEntity<int>, IAggregateRoot
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public string HighlightedDescription { get; private set; }
        public int NumberOfEmployeesRequired { get; private set; }
        public Address Location { get; private set; }
        public int LocationId { get; private set; }
        public JobDurationType JobDurationType { get; private set; }
        public Price Price { get; private set; }
        public JobUrgency Urgency { get; private set; }
        public DateTimeOffset CreateDate { get; private set; }
        public int UserId { get; private set; }
        public JobStatus JobStatus { get; private set; }
        public int CategoryId { get; private set; }
        public Category Category { get; private set; }
        public Employer Employer { get; private set; }
        public string EmployerId { get; private set; }
        private Job()
        {
            // for ef core
        }

        public Job(string name,
                   string description,
                   string highlightedDescription,
                   Address location,
                   int numberOfEmployeesRequred,
                   JobDurationType jobDurationType,
                   Price price,
                   JobUrgency urgency,
                   int userId,
                   int categoryId,
                   Employer employer) {
            Guard.Against.NullOrWhiteSpace(name, nameof(name));
            Guard.Against.NullOrWhiteSpace(description, nameof(description));
            Guard.Against.Null(employer, nameof(employer));
            this.Name = name;
            this.Description = description;
            this.HighlightedDescription = highlightedDescription;
            this.NumberOfEmployeesRequired = numberOfEmployeesRequred;
            this.Location = location;
            this.JobDurationType = jobDurationType;
            this.Price = price;
            this.Urgency = urgency;
            CreateDate = DateTimeOffset.UtcNow;
            this.UserId = userId;
            this.JobStatus = JobStatus.Active;
            this.CategoryId = categoryId;
            this.Employer = employer;
        }
    }
}
