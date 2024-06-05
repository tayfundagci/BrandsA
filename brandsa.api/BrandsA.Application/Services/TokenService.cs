using BrandsA.Core.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BrandsA.Shared;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BrandsA.Application.Services
{
    public class TokenService
    {
        public Token CreateToken(User user)
        {
            var settings = Configuration.GetSettings<Core.Entities.Settings>("Token");

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Username.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            Token tokenModel = new Token();
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.SecurityKey));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            tokenModel.Expiration = DateTime.Now.AddMinutes(30);
            JwtSecurityToken securityToken = new JwtSecurityToken
                (
                issuer: settings.Issuer,
                audience: settings.Audience,
                claims: claims,
                expires: tokenModel.Expiration,
                notBefore: DateTime.Now,
                signingCredentials: credentials
                );
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
           
            tokenModel.Access_Token = tokenHandler.WriteToken(securityToken);
            tokenModel.Refresh_Token = CreateRefreshToken();
            return tokenModel;
        }

        public string CreateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
