using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Response;
using MediatR;

namespace BrandsA.Application.Handlers.Product.Queries
{
    public class GetProductQuery : IRequest<BaseDataResponse<ProductDto>>
    {
        public Guid Id { get; set; }
        public class GetProductQueryHandler : IRequestHandler<GetProductQuery, BaseDataResponse<ProductDto>>
        {
            IProductRepository _productRepository;
            private readonly IMapper _mapper;

            public GetProductQueryHandler(IProductRepository productRepository, IMapper mapper)
            {
                _productRepository = productRepository;
                _mapper = mapper;
            }

            public async Task<BaseDataResponse<ProductDto>> Handle(GetProductQuery request, CancellationToken cancellationToken)
            {
                var product = await _productRepository.GetById(request.Id);
                var productDto = _mapper.Map<ProductDto>(product);
                return new BaseDataResponse<ProductDto>(productDto, true, "success");
            }
        }
    }
}
