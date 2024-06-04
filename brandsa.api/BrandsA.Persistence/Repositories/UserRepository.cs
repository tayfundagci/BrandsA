using BrandsA.Application.Interfaces;
using BrandsA.Core.Entities;
using BrandsA.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrandsA.Persistence.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly DbSet<User> _dbSet;
        private readonly EfContext _context;
        public UserRepository(EfContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<User>();
        }
    }
}
