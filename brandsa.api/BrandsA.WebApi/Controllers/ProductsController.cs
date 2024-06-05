using BrandsA.Application.Handlers.Product.Commands;
using BrandsA.Application.Handlers.Product.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public async Task<ActionResult> Create(CreateProductCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpGet]
        public async Task<ActionResult> List([FromQuery] ListProductsQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            return Ok(await _mediator.Send(new DeleteProductCommand { Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, UpdateProductCommand command)
        {
            command.Id = id;
            return Ok(await _mediator.Send(command));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Detail(Guid id)
        {
            return Ok(await _mediator.Send(new GetProductQuery { Id = id }));
        }

    }
}
