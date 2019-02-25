using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ReactApp.Models
{
    public class Sales
    {
        
        public int Id { get; set; }

        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }

        //Navigation Properties
       
        public virtual Customer Customer { get; set; }
        // [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
        // [ForeignKey("StoreId")]
        public virtual Store Store { get; set; }
    }

}