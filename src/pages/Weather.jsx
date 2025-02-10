import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "leaflet/dist/leaflet.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 min-h-screen bg-gradient-to-t from-neutral-100 to-green-300 text-black p-5">
      <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Weather Forecast</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={fetchWeather}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-3 p-3 rounded-lg transition duration-300"
        >
          Get Weather
        </button>
      </div>
      </div>
        <div>
      {loading && <p className="mt-4 text-lg">Fetching weather...</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
     
      {weather && (
         <div>
            <div  className="flex flex-col justify-center items-center">
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
          <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <div className="flex flex-col justify-between mt-3">
            <p className="text-xl">🌡 Temp: {weather.main.temp}°C</p>
            <p className="text-xl">💧 Humidity: {weather.main.humidity}%</p>
            <p className="text-xl">💨 Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">📈 Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={[
                  { time: "6 AM", temp: weather.main.temp - 3 },
                  { time: "9 AM", temp: weather.main.temp - 1 },
                  { time: "12 PM", temp: weather.main.temp },
                  { time: "3 PM", temp: weather.main.temp + 2 },
                  { time: "6 PM", temp: weather.main.temp - 1 },
                  { time: "9 PM", temp: weather.main.temp - 3 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">💧Humidity Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={[
                    { time: "6 AM", humidity: weather.main.humidity + 5 },
                    { time: "9 AM", humidity: weather.main.humidity + 3 },
                    { time: "12 PM", humidity: weather.main.humidity },
                    { time: "3 PM", humidity: weather.main.humidity - 2 },
                    { time: "6 PM", humidity: weather.main.humidity - 3 },
                    { time: "9 PM", humidity: weather.main.humidity + 2 },
                  ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                <Tooltip />
                <Line type="monotone" dataKey="humidity" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>


          <div className="mt-6">
            <h3 className="text-lg font-semibold">Location Map</h3>
            <MapContainer
              center={[weather.coord.lat, weather.coord.lon]}
              zoom={20}
              className="h-64 w-fill rounded-lg mt-2"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[weather.coord.lat, weather.coord.lon]}>
                <Popup>{weather.name}, {weather.sys.country}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
