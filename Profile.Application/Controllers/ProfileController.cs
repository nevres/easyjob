using MediatR;
using Microsoft.AspNetCore.Mvc;
using Profile.Application.Commands.AddOrUpdateUser;
using Profile.Application.Queries.GetUser;
using Profile.Application.Shared;
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
        public async Task<UserResponse> GetAsync(string id) {
            return await _mediator.Send(new GetUserQuery() { Id = id });
        }

        [HttpPut("{id}")]
        public async Task<UserResponse> AddOrUpdate(string id, AddOrUpdateUserCommand command)
        {

            return await _mediator.Send(command);
        }
    }
}
