﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrandsA.Core.Entities
{
    public class Token
    {
        public string Access_Token { get; set; }
        public DateTime Expiration { get; set; }
        public string Refresh_Token { get; set; }
    }
}
