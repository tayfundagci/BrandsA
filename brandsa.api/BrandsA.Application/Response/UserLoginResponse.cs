using BrandsA.Application.Dtos;
using BrandsA.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrandsA.Application.Response
{
    public class UserLoginResponse 
    {
        public string Access_Token { get; set; }
        public DateTime Expiration { get; set; }
        public string Refresh_Token { get; set; }
        public UserDto User { get; set; }

    }
}
