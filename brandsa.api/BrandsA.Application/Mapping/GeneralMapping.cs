using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Handlers.Product.Commands;
using BrandsA.Application.Handlers.Product.Queries;
using BrandsA.Application.Handlers.User.Commands;
using BrandsA.Core.Entities;

namespace BrandsA.Application.Mapping
{
    public class GeneralMapping : Profile
    {
        public GeneralMapping()
        {
            //User
            CreateMap<User, UserDto>();
            CreateMap<CreateUserCommand, User>();
            //Product
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductCommand, Product>();
            CreateMap<UpdateProductCommand, Product>();
            CreateMap<DeleteProductCommand, Product>();
            CreateMap<ListProductsQuery, Product>();
        }
    }
}
