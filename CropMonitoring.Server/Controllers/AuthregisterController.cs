using CropMonitoring.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace CropMonitoring.Server.Controllers
{
    [ApiController]
    [Route("/Authregister")]
    public class AutoregisterController : Controller
    {
        [HttpPost]
        public IActionResult Login([FromBody] RegisterViewModel model)
        {
            return Ok(new { message = "Credenciales correctas!" });
        }
    }
}
