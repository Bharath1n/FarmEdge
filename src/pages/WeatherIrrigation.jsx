import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import "../styles/weatherIrrigation.css"; // Ensure this CSS file exists for styling

const WeatherIrrigation = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [irrigationDecision, setIrrigationDecision] = useState("Loading...");
    const [waterNeed, setWaterNeed] = useState("Waiting...");

    const meteoblueApiKey = import.meta.env.VITE_METEOBLUE_API_KEY; // Use Vite's environment variable
    const city = "Bangalore";

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=5bWQmld9LeK1JwUp&lat=12.9719&lon=77.5937&asl=920&format=json`);
            const data = await response.json();
            setWeatherData(data);
            updateIrrigationDecision(data);
            updateWeatherGraph(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please try again later.");
        }
    };

    const updateWeatherGraph = (data) => {
        const labels = data.time.map(time => new Date(time).toLocaleDateString());
        const tempData = data.temperature_2m;
        const precipData = data.precipitation_sum;
        const humidityData = data.humidity_2m;

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
        const rain = data.precipitation_sum[0]; // Assuming the first value is for today
        const decision = rain > 5 ? "No irrigation needed" : rain > 2 ? "Reduced irrigation" : "Full irrigation required";
        const icon = rain > 5 ? "no-water.png" : rain > 2 ? "reduced-water.png" : "full-water.png";

        setIrrigationDecision(decision);
        document.getElementById('irrigation-icon').src = `./assets/${icon}`;
    };

    const calculateCropWatering = () => {
        const area = document.getElementById('crop-area').value;
        const cropType = document.getElementById('crop-type').value;
        const waterNeeds = { wheat: 0.5, rice: 1.0, corn: 0.8 }; // Water needs in cubic meters per hectare

        const waterRequired = area * waterNeeds[cropType];
        setWaterNeed(`Water needed for ${area} hectares of ${cropType}: ${waterRequired} m³`);
    };

    return (
        <div className="weather-irrigation-container">
            <h1>Weather Irrigation Decision</h1>
            <canvas id="weatherChart" width="400" height="200"></canvas>
            <div className="irrigation-decision">
                <h2>Irrigation Decision: {irrigationDecision}</h2>
                <img id="irrigation-icon" src="./assets/loading.png" alt="Irrigation Icon" />
            </div>
            <div className="crop-water-calculation">
                <h3>Calculate Watering Needs</h3>
                <input type="number" id="crop-area" placeholder="Area (hectares)" />
                <select id="crop-type">
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="corn">Corn</option>
                </select>
                <button onClick={calculateCropWatering}>Calculate Watering</button>
                <p>{waterNeed}</p>
            </div>
        </div>
    );
};

export default WeatherIrrigation;