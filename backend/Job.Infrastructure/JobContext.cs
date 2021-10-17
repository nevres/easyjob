using Microsoft.EntityFrameworkCore;
using JobProcessing.Domain.Entities;
using JobProcessing.Infrastructure.EntityConfigurations;

namespace JobProcessing.Infrastructure
{
    public class JobContext : DbContext
    {
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Category> Categories { get; set; }

        public JobContext(DbContextOptions<JobContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Job");
            modelBuilder.ApplyConfiguration(new JobEntityConfiguration());

            modelBuilder.Entity<Category>().ToTable("Category");
        }
    }
}
