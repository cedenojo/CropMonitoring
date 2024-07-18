namespace WeatherApi.Models
{
    public class WeatherRequest
    {
        public Geometry geometry { get; set; }
        public string Date { get; set; }
        public int Temp_air_min { get; set; }
        public int Temp_air_max { get; set; }
        public int Temp_land_min { get; set; }
        public int Temp_land_max { get; set; }
        public int Rel_humidity { get; set; }
        public int Snow_depth { get; set; }
        public Rain Rain { get; set; }
        public Windspeed Windspeed { get; set; }
    }

    public class Geometry
    {
        public string type { get; set; }
        public double[] coordinates { get; set; }
    }

    public class Rain
    {
        public int _02h { get; set; }
        public int _05h { get; set; }
        public int _08h { get; set; }
        public int _11h { get; set; }
        public int _14h { get; set; }
        public int _17h { get; set; }
        public int _20h { get; set; }
        public int _23h { get; set; }
    }

    public class Windspeed
    {
        public int _02h { get; set; }
        public int _05h { get; set; }
        public int _08h { get; set; }
        public int _11h { get; set; }
        public int _14h { get; set; }
        public int _17h { get; set; }
        public int _20h { get; set; }
        public int _23h { get; set; }
    }
}
