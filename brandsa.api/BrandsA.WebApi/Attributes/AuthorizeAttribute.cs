﻿using BrandsA.Application.Response;
using BrandsA.Core.Entities;
using BrandsA.Core.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace BrandsA.WebApi.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly IList<enmRole> _userRoles;

        public AuthorizeAttribute(params enmRole[] userRoles)
        {
            _userRoles = userRoles ?? new enmRole[] { };
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;
            if (context != null && context.HttpContext != null)
            {
                var user = context.HttpContext.Items["User"] as User;
                if (user == null || _userRoles.Any() && !_userRoles.Contains(user.Role))
                {
                    context.Result = new JsonResult(new BaseResponse(false, "Unauthorized!")) { StatusCode = StatusCodes.Status401Unauthorized };
                }
            }
        }
    }
}
