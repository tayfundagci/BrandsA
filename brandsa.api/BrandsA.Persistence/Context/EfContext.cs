using BrandsA.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BrandsA.Persistence.Context
{
    public class EfContext : DbContext
    {
        public EfContext(DbContextOptions<EfContext> options) : base(options) { }
        public DbSet<User> User { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
