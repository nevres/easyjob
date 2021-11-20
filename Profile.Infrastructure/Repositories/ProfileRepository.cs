using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using Profile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profile.Infrastructure.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly ProfileContext _context;

        public ProfileRepository(ProfileContext context)
        {
            _context = context;
        }
        public Task<User> AddAsync(User entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(User entity)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetByIdAsync(string id)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.Id == id);
        }

        public Task<IEnumerable<User>> ListAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> ListAsync(params ISpecification<User>[] specs)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(User entity)
        {
            throw new NotImplementedException();
        }
    }
}
