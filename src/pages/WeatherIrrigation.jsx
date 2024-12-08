import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import '../styles/weatherIrrigation.css'; // Ensure this CSS file exists for styling

const WeatherIrrigation = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [irrigationDecision, setIrrigationDecision] = useState("Loading...");
    const [waterNeed, setWaterNeed] = useState("Waiting...");

    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY; // Use Vite's environment variable
    const city = "Bangalore";

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=3`);
            const data = await response.json();
            setWeatherData(data);
            updateIrrigationDecision(data);
            updateWeatherGraph(data.forecast.forecastday);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please try again later.");
        }
    };

    const updateWeatherGraph = (forecastData) => {
        const labels = forecastData.map(day => day.date);
        const tempData = forecastData.map(day => day.day.avgtemp_c);
        const precipData = forecastData.map(day => day.day.totalprecip_mm);
        const humidityData = forecastData.map(day => day.day.avghumidity);

        const ctx = document.getElementById('weatherChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        data: tempData,
                        borderColor: '#985efc',
                        backgroundColor: 'rgba(152, 94, 252, 0.3)',
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: 'Precipitation (mm)',
                        data: precipData,
                        borderColor: '#7d47b4',
                        backgroundColor: 'rgba(125, 71, 180, 0.3)',
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: 'Humidity (%)',
                        data: humidityData,
                        borderColor: '#bb86fc',
                        backgroundColor: 'rgba(187, 134, 252, 0.3)',
                        fill: true,
                        tension: 0.4,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#333',
                            font: { size: 14 }
                        }
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Dates',
                            color: '#333',
                            font: { size: 16 }
                        },
                        ticks: {
                            color: '#333',
                            font: { size: 12 }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Values',
                            color: '#333',
                            font: { size: 16 }
                        },
                        ticks: {
                            color: '#333',
                            font: { size: 12 }
                        },
                        beginAtZero: true,
                    }
                }
            }
        });
    };

    const updateIrrigationDecision = (data) => {
        const rain = data.forecast.forecastday[0].day.totalprecip_mm;
        const decision = rain > 5 ? "No irrigation needed" : rain > 2 ? "Reduced irrigation" : "Full irrigation required";
        const icon = rain > 5 ? "no-water.png" : rain > 2 ? "reduced-water.png" : "full-water.png";

        setIrrigationDecision(decision);
        document.getElementById('irrigation-icon').src = `./assets/${icon}`;
    };

    const calculateCropWatering = () => {
        const area = document.getElementById('crop-area').value;
        const cropType = document.getElementById('crop-type').value;
        const waterNeeds = { wheat: 0.6, rice: 1.2, corn: 1.0 }; // Water needs in liters per square meter

        const waterRequired = area * (waterNeeds[cropType] || 0);
        setWaterNeed(`Water needed for ${area} m² of ${cropType}: ${waterRequired} liters`);
    };

    return (
        <div className="weather-irrigation">
            <h2>Weather Irrigation Dashboard</h2>
            <canvas id="weatherChart"></canvas>
            <div className="card">
                <h3>Irrigation Decision</h3>
                <p>{irrigationDecision}</p>
                <img id="irrigation-icon" src="./assets/loading.png" alt="Irrigation Icon" />
            </div>
            <div className="card">
                <h3>Crop Watering Calculator</h3>
                <input type="number" id="crop-area" placeholder="Area (m²)" />
                <select id="crop-type">
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="corn">Corn</option>
                </select>
                <button onClick={calculateCropWatering}>Calculate Water Needed</button>
                <p>{waterNeed}</p>
            </div>
        </div>
    );
};

export default WeatherIrrigation;