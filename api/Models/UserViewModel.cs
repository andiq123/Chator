using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class UserViewModel
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? PhotoUrl { get; set; }
        public string? Description { get; set; }
    }
}