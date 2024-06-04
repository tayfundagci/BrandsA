using BrandsA.Core.Common;
using BrandsA.Core.Enums;

namespace BrandsA.Core.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public enmRole Role { get; set; } = enmRole.User;
    }
}
