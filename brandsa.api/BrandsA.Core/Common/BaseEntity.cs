namespace BrandsA.Core.Common
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public BaseEntity()
        {
            Id = Guid.NewGuid();    
        }
        public bool IsDeleted { get; set; }
    }
}
