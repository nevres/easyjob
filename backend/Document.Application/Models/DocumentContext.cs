using Microsoft.EntityFrameworkCore;

namespace Document.Application.Models
{
    public class DocumentContext : DbContext
    {
        public DbSet<Document> Documents { get; set; }

        public DocumentContext(DbContextOptions<DocumentContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Document");
        }
    }
}
