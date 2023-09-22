using DoctorPC_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace DoctorPC_Web.Data
{
    public class DoctorPC_WebContext : DbContext
    {
        public DoctorPC_WebContext(DbContextOptions<DoctorPC_WebContext> options)
            : base(options)
        {
        }

        public DbSet<user> user { get; set; } // Add this DbSet property

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<user>()
                .HasKey(c => c.uid);

            modelBuilder.Entity<product>()
                .HasKey(p => p.pid);

            modelBuilder.Entity<cards>()
                .HasKey(cr => cr.cid);

            // Specify the primary key

            // If 'computer' is meant to be a keyless entity type, you can do:
            // modelBuilder.Entity<computer>().HasNoKey();

            // Your other configurations go here...
        }

        public DbSet<DoctorPC_Web.Models.product>? product { get; set; }

        public DbSet<DoctorPC_Web.Models.cards>? cards { get; set; }
    }
}
