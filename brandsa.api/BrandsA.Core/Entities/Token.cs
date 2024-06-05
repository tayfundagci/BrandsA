
namespace BrandsA.Core.Entities
{
    public class Token
    {
        public string Access_Token { get; set; }
        public DateTime Expiration { get; set; }
        public string Refresh_Token { get; set; }
    }
}
