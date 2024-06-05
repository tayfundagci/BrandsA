using BrandsA.Application.Interfaces;
using Microsoft.IdentityModel.Logging;

namespace BrandsA.WebApi.Middlewares
{
    public class RequestIdentifyMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestIdentifyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IUserRepository userRepository, ITokenService tokenService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                var userId = tokenService.ValidateToken(token);
                if (userId != Guid.Empty)
                    context.Items["User"] = await userRepository.GetById(userId);
                await _next(context);
            }
            else
            {
                try
                {
                    await _next(context);
                }
                catch (Exception e)
                {
                    LogHelper.LogExceptionMessage(e);
                }
            }
        }
    }
}
