using BrandsA.Application.Interfaces;
using BrandsA.Persistence.Context;
using BrandsA.Persistence.Repositories;
using BrandsA.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrandsA.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this Microsoft.Extensions.DependencyInjection.IServiceCollection services)
        {
            services.AddDbContext<EfContext>(options =>
            options.UseSqlServer(Configuration.GetSettings<string>("ConnectionStrings:DefaultConnection")));

            //services.AddIdentityCore<User>(opt =>
            //{
            //    opt.Password.RequireNonAlphanumeric = false;
            //    opt.Password.RequiredLength = 2;
            //    opt.Password.RequireLowercase = false;
            //    opt.Password.RequireUppercase = false;
            //    opt.Password.RequireDigit = false;
            //    opt.SignIn.RequireConfirmedEmail = false;

            //}).AddRoles<Role>().AddEntityFrameworkStores<EfContext>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
        }
    }
}
