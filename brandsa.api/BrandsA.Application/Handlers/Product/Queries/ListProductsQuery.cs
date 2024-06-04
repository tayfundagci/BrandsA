using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Response;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrandsA.Application.Handlers.Product.Queries
{
    public class ListProductsQuery : IRequest<List<ProductDto>>
    {
        public class ListProductsQueryHandler : IRequestHandler<ListProductsQuery, List<ProductDto>>
        {
            IProductRepository _productRepository;
            private readonly IMapper _mapper;

            public ListProductsQueryHandler(IProductRepository productRepository, IMapper mapper)
            {
                _productRepository = productRepository;
                _mapper = mapper;
            }

            public async Task<List<ProductDto>> Handle(ListProductsQuery request, CancellationToken cancellationToken)
            {
                var productList = await _productRepository.List();
                var productListDto = _mapper.Map<List<ProductDto>>(productList).OrderBy(x => x.CreatedDate).Where(x=> !x.IsDeleted).ToList();
                return productListDto;
            }
        }
    }
}
