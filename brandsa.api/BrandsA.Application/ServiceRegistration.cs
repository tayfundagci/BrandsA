using AutoMapper;
using BrandsA.Application.Handlers.Product.Commands;
using BrandsA.Application.Handlers.Product.Queries;
using BrandsA.Application.Handlers.User.Commands;
using BrandsA.Application.Mapping;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace BrandsA.Application
{
    public static class ServiceRegistration
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //Mapper register
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new GeneralMapping());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            //Mediatr register
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
                //User
                typeof(CreateUserCommand).Assembly,
                //Product
                typeof(CreateProductCommand).Assembly,
                typeof(UpdateProductCommand).Assembly,
                typeof(ListProductsQuery).Assembly,
                typeof(DeleteProductCommand).Assembly
            ));; 
        }
    }
}
