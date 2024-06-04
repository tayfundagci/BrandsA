using AutoMapper;
using BrandsA.Application.Handlers.User;
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
                typeof(CreateUserCommand).Assembly
            ));
        }
    }
}
