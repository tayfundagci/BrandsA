using BrandsA.Application.Handlers.Product.Commands;
using BrandsA.Application.Handlers.Product.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthorizeAttribute = BrandsA.WebApi.Attributes.AuthorizeAttribute;

namespace BrandsA.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> List([FromQuery] ListProductsQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Detail(Guid id)
        {
            return Ok(await _mediator.Send(new GetProductQuery { Id = id }));
        }

        [Authorize(Core.Enums.enmRole.Admin)]
        [HttpPost]
        public async Task<ActionResult> Create(CreateProductCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [Authorize(Core.Enums.enmRole.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            return Ok(await _mediator.Send(new DeleteProductCommand { Id = id }));
        }

        [Authorize(Core.Enums.enmRole.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, UpdateProductCommand command)
        {
            command.Id = id;
            return Ok(await _mediator.Send(command));
        }

        

    }
}
