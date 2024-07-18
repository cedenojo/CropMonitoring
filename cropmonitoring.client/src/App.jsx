import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';


function App() {
    const [forecasts, setForecasts] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Temp_air_min (C)',
                data: [],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Temp_air_max (C)',
                data: [],
                fill: false,
                backgroundColor: 'rgb(192, 75, 75)',
                borderColor: 'rgba(192, 75, 75, 0.2)',
            },
            {
                label: 'Temp_land_min (C)',
                data: [],
                fill: false,
                backgroundColor: 'rgb(75, 75, 192)',
                borderColor: 'rgba(75, 75, 192, 0.2)',
            },
            {
                label: 'Temp_land_max (C)',
                data: [],
                fill: false,
                backgroundColor: 'rgb(192, 192, 75)',
                borderColor: 'rgba(192, 192, 75, 0.2)',
            },
            {
                label: 'Rel_humidity (%)',
                data: [],
                fill: false,
                backgroundColor: 'rgb(75, 192, 75)',
                borderColor: 'rgba(75, 192, 75, 0.2)',
            }
        ],
    });

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('loggedIn');
        if (userLoggedIn) {
            setLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
    };

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts.length === 0 ? (
        <p><em>Cargando los datos meteorologico, espere un momento por favor!</em></p>
    ) : (
        <div>
            <h1 id="tableLabel">DATA METEOROLOGICA</h1>
            <p>PRECIPITACIONES ACUMULADAS - PRONOSTICO DE TIEMPO ACUMULADAS</p>
            <table className="table table-striped" aria-labelledby="tableLabel">
                {/* Contenido de la tabla */}
            </table>
            <div>
                <h2>Grafico de tiempo - Crop monitoring</h2>
                <Line data={chartData} />
            </div>
        </div>
    );

    return (
        <Router>
            <div className="App">
                <header>
                    <nav className="Menu-one">
                        <ul>
                            <li><Link to="/forecast">Inicio</Link></li>
                            <li><Link to="/">Pronosticos</Link></li>
                            <li><Link to="/">Api</Link></li>
                            <li><Link to="/">Preguntas Frecuentes</Link></li>
                            <li><Link to="/account">Cuenta</Link></li>
                        </ul>
                    </nav>
                </header>

                <Routes>
                    <Route path="forecast" element={loggedIn ? contents : <Login onLogin={handleLogin} />} />
                    <Route path="/" element={loggedIn ? contents : <Login onLogin={handleLogin} />} />
                    <Route path="/api" element={loggedIn ? contents : <Login onLogin={handleLogin} />} />
                    <Route path="/faq" element={loggedIn ? contents : <Login onLogin={handleLogin} />} />
                    <Route path="/account" element={<Login onLogin={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );

    async function populateWeatherData() {
        try {
            const response = await fetch('https://localhost:7080/api/weather/GetWeatherForecast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "geometry": {
                        "type": "Point",
                        "coordinates": [49.5615, -7.6759]
                    },
                    "Date": "2024-07-18",
                    "Temp_air_min": 15,
                    "Temp_air_max": 25,
                    "Temp_land_min": 18,
                    "Temp_land_max": 28,
                    "Rel_humidity": 60,
                    "Snow_depth": 0,
                    "Rain": {
                        "02h": 0,
                        "05h": 0,
                        "08h": 1,
                        "11h": 3,
                        "14h": 0,
                        "17h": 0,
                        "20h": 0,
                        "23h": 0
                    },
                    "Windspeed": {
                        "02h": 5,
                        "05h": 7,
                        "08h": 8,
                        "11h": 10,
                        "14h": 9,
                        "17h": 6,
                        "20h": 4,
                        "23h": 3
                    }
                })
            });
            if (!response.ok) {
                console.error('Error en la respuesta de la API:', response.status, response.statusText);
                return;
            }
            const text = await response.text();
            try {
                const data = JSON.parse(text);

                setForecasts(data);

                const labels = data.map(forecast => forecast.Date);
                const tempAirMinData = data.map(forecast => forecast.Temp_air_min);
                const tempAirMaxData = data.map(forecast => forecast.Temp_air_max);
                const tempLandMinData = data.map(forecast => forecast.Temp_land_min);
                const tempLandMaxData = data.map(forecast => forecast.Temp_land_max);
                const relHumidityData = data.map(forecast => forecast.Rel_humidity);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Temp_air_min (C)',
                            data: tempAirMinData,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                        {
                            label: 'Temp_air_max (C)',
                            data: tempAirMaxData,
                            fill: false,
                            backgroundColor: 'rgb(192, 75, 75)',
                            borderColor: 'rgba(192, 75, 75, 0.2)',
                        },
                        {
                            label: 'Temp_land_min (C)',
                            data: tempLandMinData,
                            fill: false,
                            backgroundColor: 'rgb(75, 75, 192)',
                            borderColor: 'rgba(75, 75, 192, 0.2)',
                        },
                        {
                            label: 'Temp_land_max (C)',
                            data: tempLandMaxData,
                            fill: false,
                            backgroundColor: 'rgb(192, 192, 75)',
                            borderColor: 'rgba(192, 192, 75, 0.2)',
                        },
                        {
                            label: 'Rel_humidity (%)',
                            data: relHumidityData,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 75)',
                            borderColor: 'rgba(75, 192, 75, 0.2)',
                        }
                    ],
                });
            } catch (e) {
                console.error('Error al analizar los datos:', e);
                console.log('Respuesta del servidor:', text);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }
}

export default App;
