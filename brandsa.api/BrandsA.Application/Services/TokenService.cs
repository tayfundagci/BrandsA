using BrandsA.Core.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BrandsA.Shared;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BrandsA.Application.Interfaces;

namespace BrandsA.Application.Services
{
    public class TokenService : ITokenService
    {
        public Token CreateToken(User user)
        {
            var settings = Configuration.GetSettings<Core.Entities.Settings>("Token");

            var claims = new List<Claim>()
            {
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.Username.ToString()),
                new Claim("role", user.Role.ToString())
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

        public Guid ValidateToken(string token)
        {
            if (token == null)
                return Guid.Empty;
            var settings = Configuration.GetSettings<Core.Entities.Settings>("Token");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(settings.SecurityKey);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                return userId;
            }
            catch
            {
                return Guid.Empty;
            }
        }
    }
}
