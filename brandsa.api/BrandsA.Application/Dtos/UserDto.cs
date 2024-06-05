using BrandsA.Core.Enums;
namespace BrandsA.Application.Dtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public enmRole Role { get; set; }
    }
}
