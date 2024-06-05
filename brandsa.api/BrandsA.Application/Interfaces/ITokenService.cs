using BrandsA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrandsA.Application.Interfaces
{
    public interface ITokenService
    {
        Token CreateToken(User user);
        string CreateRefreshToken();
        Guid ValidateToken(string token);

    }
}
