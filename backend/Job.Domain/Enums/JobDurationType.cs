using System;
using System.Collections.Generic;
using System.Text;

namespace JobProcessing.Domain.Enums
{
    public enum JobDurationType
    {
        LessThanADay,
        LessThanAWeek,
        LessThanAMonth,
        OneToSixMonths,
        MoreThanSixMonths
    }
}
