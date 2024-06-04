using BrandsA.Application.Handlers.User.Commands;
using BrandsA.Application.Handlers.User.Queries;
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
        public async Task<ActionResult> SignUp(CreateUserCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPost("loginbyusername")]
        public async Task<ActionResult> Login(UserLoginQuery command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpGet("refreshtoken")]
        public async Task<ActionResult> RefreshToken(RefreshTokenCommand query)
        {
            return Ok(await _mediator.Send(query));
        }


    }
}
