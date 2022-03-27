using Microsoft.EntityFrameworkCore;
using Profile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Profile.Infrastructure
{
    public class ProfileContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public ProfileContext(DbContextOptions<ProfileContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Profile");
            base.OnModelCreating(modelBuilder);
        }
    }
}
