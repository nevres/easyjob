using Ardalis.GuardClauses;
using JobProcessing.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace JobProcessing.Domain.ValueTypes
{
    public class Price
    {
        public string CurrencyCode { get; private set; }
        public PriceType PriceType { get; private set; }
        public int MinPrice { get; private set; }
        public int MaxPrice { get; private set; }

        public Price() { 
            // Required for EF Core
        }

        public Price(string currencyCode, int fixedPriceAmount) {
            Guard.Against.NullOrWhiteSpace(currencyCode, nameof(currencyCode));
            Guard.Against.NegativeOrZero(fixedPriceAmount, nameof(fixedPriceAmount));
            PriceType = PriceType.FixedPrice;
            CurrencyCode = currencyCode;
            MinPrice = fixedPriceAmount;
            MaxPrice = fixedPriceAmount;
        }

        public Price(string currencyCode, int minHourlyRate, int maxHourlyRate)
        {
            Guard.Against.NullOrWhiteSpace(currencyCode, nameof(currencyCode));
            Guard.Against.NegativeOrZero(minHourlyRate, nameof(minHourlyRate));
            Guard.Against.NegativeOrZero(maxHourlyRate, nameof(maxHourlyRate));

            PriceType = PriceType.Hourly;
            CurrencyCode = currencyCode;
            MinPrice = minHourlyRate;
            MaxPrice = maxHourlyRate;
        }
    }
}
