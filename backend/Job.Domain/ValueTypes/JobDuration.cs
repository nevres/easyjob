using Ardalis.GuardClauses;
using JobProcessing.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace JobProcessing.Domain.ValueTypes
{
    public class JobDuration
    {
        public int Amount { get; private set; }
        public JobDurationType DurationType { get; private set; }

        public JobDuration(int amount, JobDurationType durationType) {
            Guard.Against.NegativeOrZero(amount, nameof(amount));
            Amount = amount;
            DurationType = durationType;
        }
    }
}
