using Microsoft.AspNetCore.Mvc;
using WeatherApi.Models;

namespace WeatherApi.Controllers
{
    [ApiController]
    [Route("api/weather")]
    public class WeatherController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public WeatherController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost]
        [Route("GetWeatherForecast")]
        public async Task<IActionResult> GetWeatherForecast([FromBody] WeatherRequest request)
        {
            var apiUrl = "https://api-connect.eos.com/api/forecast/weather/forecast/?api_key=apk.826226856cad3f8f73a623e0c0f6529a3c4ab239a48769e55a752405ce6b87cf";

            var response = await _httpClient.PostAsJsonAsync(apiUrl, request);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }
        }
    }

}
