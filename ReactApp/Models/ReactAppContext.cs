using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ReactApp.Models
{
    public partial class ReactAppContext : DbContext
    {
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Store> Store { get; set; }

        public ReactAppContext()
        {
        }

        public ReactAppContext(DbContextOptions<ReactAppContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:reactappserver.database.windows.net,1433;Initial Catalog=ReactApp;Persist Security Info=False;User ID=renh09;Password=Renhui1012;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {}
    }
}
