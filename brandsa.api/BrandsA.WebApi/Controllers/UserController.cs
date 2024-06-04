using BrandsA.Application.Handlers.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrandsA.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
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
