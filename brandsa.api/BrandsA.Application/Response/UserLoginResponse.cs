using BrandsA.Application.Dtos;

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
