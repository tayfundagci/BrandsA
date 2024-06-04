using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrandsA.Application.Response
{
    public class BaseDataResponse<T> : BaseResponse
    {
        public T Body { get; set; }

        public BaseDataResponse(T pBody, bool pSuccess, string pMessage) : base(pSuccess, pMessage)
        {
            Body = pBody;
        }
    }
}
