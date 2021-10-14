using MediatR;
using Shared.Pagging;
using System.Collections.Generic;

namespace JobProcessing.Application.Queries.GetJobs
{
    public record GetJobsQuery(string Name,
        string Description, 
        int Page, 
        int PageSize, 
        string OrderBy) : BaseFilter(Page, PageSize, OrderBy), IRequest<IEnumerable<JobResponse>>;
}
