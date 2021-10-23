﻿using Ardalis.GuardClauses;
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
        public JobDuration Duration { get; private set; }
        public Price Price { get; private set; }
        public JobUrgency Urgency { get; private set; }
        public DateTimeOffset CreateDate { get; private set; }
        public int UserId { get; private set; }
        public JobStatus JobStatus { get; private set; }
        public int CategoryId { get; private set; }
        public Category Category { get; private set; }
        
        private Job()
        {
            // for ef core
        }

        public Job(string name,
                   string description,
                   string highlightedDescription,
                   Address location,
                   int numberOfEmployeesRequred,
                   JobDuration duration,
                   Price price,
                   JobUrgency urgency,
                   int userId,
                   int categoryId) {
            Guard.Against.NullOrWhiteSpace(name, nameof(name));
            Guard.Against.NullOrWhiteSpace(description, nameof(description));
            this.Name = name;
            this.Description = description;
            this.HighlightedDescription = highlightedDescription;
            this.NumberOfEmployeesRequired = numberOfEmployeesRequred;
            this.Location = location;
            this.Duration = duration;
            this.Price = price;
            this.Urgency = urgency;
            CreateDate = DateTimeOffset.UtcNow;
            this.UserId = userId;
            this.JobStatus = JobStatus.Active;
            this.CategoryId = categoryId;
        }
    }
}
