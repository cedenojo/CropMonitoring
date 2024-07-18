using CropMonitoring.Server.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace CropMonitoring.Server.Controllers
{
    [ApiController]
    [Route("api/Authlogin")]
    public class AuthloginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthloginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginViewModel model)
        {
            using (var connection = new MySqlConnection(_configuration.GetConnectionString("SingleStoreConnection")))
            {
                connection.Open();

                string query = "SELECT COUNT(*) FROM Authlogin WHERE Correo = @Correo AND Contrasena = @Contrasena";
                using (var cmd = new MySqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@Correo", model.Correo);
                    cmd.Parameters.AddWithValue("@Contrasena", model.Contrasena);

                    var result = Convert.ToInt32(cmd.ExecuteScalar());

                    if (result > 0)
                    {
                        return Ok(new { message = "Credenciales correctas!" });

                    }
                    else
                    {
                        return Unauthorized(new { message = "Credenciales incorrectas!" });
                    }
                }
            }
        }
    }
}
