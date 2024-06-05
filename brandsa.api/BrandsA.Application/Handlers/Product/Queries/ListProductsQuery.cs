using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Response;
using MediatR;

namespace BrandsA.Application.Handlers.Product.Queries
{
    public class ListProductsQuery : IRequest<BaseDataResponse<List<ProductDto>>>
    {
        public class ListProductsQueryHandler : IRequestHandler<ListProductsQuery,BaseDataResponse<List<ProductDto>>>
        {
            IProductRepository _productRepository;
            private readonly IMapper _mapper;

            public ListProductsQueryHandler(IProductRepository productRepository, IMapper mapper)
            {
                _productRepository = productRepository;
                _mapper = mapper;
            }

            public async Task<BaseDataResponse<List<ProductDto>>> Handle(ListProductsQuery request, CancellationToken cancellationToken)
            {
                var productList = await _productRepository.List();
                var productListDto = _mapper.Map<List<ProductDto>>(productList).OrderBy(x => x.CreatedDate).Where(x=> !x.IsDeleted).ToList();
                return new BaseDataResponse<List<ProductDto>>(productListDto, true, "success");
            }
        }
    }
}
