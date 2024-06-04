using BrandsA.Application.Handlers.Product.Commands;
using BrandsA.Application.Handlers.Product.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrandsA.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Create(CreateProductCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> List(ListProductsQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> Delete(Guid id)
        {
            return Ok(await _mediator.Send(new DeleteProductCommand { Id = id }));
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> Put(Guid id, UpdateProductCommand command)
        {
            command.Id = id;
            return Ok(await _mediator.Send(command));
        }

    }
}
