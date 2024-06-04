using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Handlers.Product.Commands;
using BrandsA.Application.Handlers.User.Commands;
using BrandsA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        }
    }
}
