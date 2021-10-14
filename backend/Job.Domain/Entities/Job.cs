using Ardalis.GuardClauses;
using JobProcessing.Domain.Enums;
using JobProcessing.Domain.ValueTypes;
using Shared.SeedWork;

namespace JobProcessing.Domain.Entities
{
    public class Job : BaseEntity<int>, IAggregateRoot
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public int NumberOfEmployeesRequired { get; private set; }
        public Address Location { get; private set; }
        public JobDuration Duration { get; private set; }
        public Price Price { get; private set; }
        public JobUrgency Urgency { get; private set; }

        private Job()
        {
            // for ef core
        }

        public Job(string name, string description, Address location, int numberOfEmployeesRequred, JobDuration duration, Price price, JobUrgency urgency) {
            Guard.Against.NullOrWhiteSpace(name, nameof(name));
            Guard.Against.NullOrWhiteSpace(description, nameof(description));
            this.Name = name;
            this.Description = description;
            this.Location = location;
            this.NumberOfEmployeesRequired = numberOfEmployeesRequred;
            this.Duration = duration;
            this.Price = price;
            this.Urgency = urgency;
        }
    }
}
