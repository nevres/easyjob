using MediatR;
using Microsoft.AspNetCore.Mvc;
using Profile.Application.Queries.GetUser;
using Profile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Profile.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfileController
    {
        private readonly IMediator _mediator;

        public ProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<User> GetAsync(string id) {
            return await _mediator.Send(new GetUserQuery() { Id = id });
        }
    }
}
