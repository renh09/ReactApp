using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;

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
        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }


    }

}