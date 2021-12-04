namespace Shared.Pagging
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;

#nullable enable

    public class FilteredResult<T> : PaggingParams
    {
        public IReadOnlyCollection<T> Data { get; private set; }
        public int Count { get; private set; }

        public FilteredResult(PaggingParams paggingParams, IEnumerable<T> data, int count)
        {
            Page = paggingParams.Page;
            PageSize = paggingParams.PageSize;
            OrderBy = paggingParams.OrderBy;
            Data = new ReadOnlyCollection<T>(data.ToList());
            Count = count;
        }

        public FilteredResult(int page,int pageSize, string orderBy, IEnumerable<T> data, int count)
        {
            Page = page;
            PageSize = pageSize;
            OrderBy = orderBy;
            Data = new ReadOnlyCollection<T>(data.ToList());
            Count = count;
        }

        private FilteredResult() { }

        public static FilteredResult<V> Clone<U, V>(FilteredResult<U> other, Func<U, V> mappingFunc)
        {
            return new FilteredResult<V>() { 
                Count = other.Count, 
                Data = new ReadOnlyCollection<V>(other.Data.Select(x => mappingFunc(x)).ToList()),
                OrderBy = other.OrderBy, 
                Page = other.Page, 
                PageSize = other.PageSize };
        }
    }
}
