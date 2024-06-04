using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Password;
using BrandsA.Application.Response;
using MediatR;

namespace BrandsA.Application.Handlers.Product.Commands
{
    public class DeleteProductCommand : IRequest<BaseResponse>
    {
        public Guid Id { get; set; }

        public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, BaseResponse>
        {
            IProductRepository _productRepository;

            public DeleteProductCommandHandler(IProductRepository productRepository)
            {
                _productRepository = productRepository;
            }

            public async Task<BaseResponse> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
            {
                var productList = await _productRepository.List();
                var selectedProduct = productList.FirstOrDefault(x => x.Id == request.Id);
                if (selectedProduct != null)
                {
                    var success = await _productRepository.SoftDelete(selectedProduct);
                    return new BaseResponse(true, "Product deleted!");
                }
                else
                {
                    return new BaseResponse(false, "Product not found");
                }

            }

        }
    }
}
