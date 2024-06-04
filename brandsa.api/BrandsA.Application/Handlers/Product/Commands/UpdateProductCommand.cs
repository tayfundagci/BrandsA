using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Password;
using BrandsA.Application.Response;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrandsA.Application.Handlers.Product.Commands
{
    public class UpdateProductCommand : IRequest<BaseResponse>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }

        public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, BaseResponse>
        {
            IProductRepository _productRepository;
            private readonly IMapper _mapper;

            public UpdateProductCommandHandler(IProductRepository productRepository, IMapper mapper)
            {
                _productRepository = productRepository;
                _mapper = mapper;
            }

            public async Task<BaseResponse> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
            {
                var existsProduct = await _productRepository.GetById(request.Id);
                if (existsProduct == null)
                {
                    return new BaseResponse(false, "Product not found!");
                }

                existsProduct.Name = request.Name;
                existsProduct.Description = request.Description;
                existsProduct.Price = request.Price;

                await _productRepository.Update(existsProduct);
                return new BaseResponse(true, "Updated!");
            }

        }
    }
}
