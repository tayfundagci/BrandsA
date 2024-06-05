using AutoMapper;
using BrandsA.Application.Dtos;
using BrandsA.Application.Interfaces;
using BrandsA.Application.Response;
using MediatR;

namespace BrandsA.Application.Handlers.Product.Commands
{
    public class CreateProductCommand : IRequest<BaseDataResponse<ProductDto>>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }

        public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, BaseDataResponse<ProductDto>>
        {
            IProductRepository _productRepository;
            private readonly IMapper _mapper;

            public CreateProductCommandHandler(IProductRepository productRepository, IMapper mapper)
            {
                _productRepository = productRepository;
                _mapper = mapper;
            }

            public async Task<BaseDataResponse<ProductDto>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
            {
                var productList = await _productRepository.List();
                var existProduct = productList.FirstOrDefault(x => x.Name == request.Name && !x.IsDeleted);

                if (existProduct == null)
                {
                    var product = new Core.Entities.Product()
                    {
                        Name = request.Name,
                        Description = request.Description,
                        Price = request.Price,
                        CreatedDate = DateTime.Now
                    };

                    var productDto = _mapper.Map<ProductDto>(product);
                    var success = await _productRepository.Create(product);
                    return new BaseDataResponse<ProductDto>(productDto, success, "Product created successfuly!");
                }
                else
                {
                    return new BaseDataResponse<ProductDto>(null!, false, "This product is already exists!");

                }
            }

        }
    }
}
