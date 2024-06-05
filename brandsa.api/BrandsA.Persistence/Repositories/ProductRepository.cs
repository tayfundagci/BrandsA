using BrandsA.Application.Interfaces;
using BrandsA.Core.Entities;
using BrandsA.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace BrandsA.Persistence.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private readonly DbSet<User> _dbSet;
        private readonly EfContext _context;
        public ProductRepository(EfContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<User>();
        }
    }
}
