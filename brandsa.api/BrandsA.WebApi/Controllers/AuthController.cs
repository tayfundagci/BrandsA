using BrandsA.Application.Handlers.User.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrandsA.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<ActionResult> SignUp(CreateUserCommand command)
        {
            return Ok(await _mediator.Send(command));
        }


    }
}
