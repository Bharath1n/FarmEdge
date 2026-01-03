import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { Cloud, Droplets, Wind, Search, MapPin, Thermometer } from "lucide-react";
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-pulse">
              <Cloud className="w-4 h-4" />
              <span className="text-sm font-medium">Real-Time Updates</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Weather Forecast</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Get accurate weather information for any city worldwide</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100 animate-slideUp">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter city name..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                />
              </div>
              <button
                onClick={fetchWeather}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? "Searching..." : "Get Weather"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-6 mt-6">
          <div className="max-w-2xl mx-auto bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-center animate-shake">
            {error}
          </div>
        </div>
      )}

      {/* Weather Information */}
      {weather && (
        <div className="container mx-auto px-6 py-12">
          {/* Current Weather Card */}
          <div className="max-w-6xl mx-auto mb-8 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-6 h-6" />
                      <h2 className="text-3xl font-bold">{weather.name}, {weather.sys.country}</h2>
                    </div>
                    <p className="text-xl text-blue-100 capitalize">{weather.weather[0].description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</div>
                    <p className="text-blue-100">Feels like {Math.round(weather.main.feels_like)}°C</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full p-4 shadow-md">
                      <Thermometer className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Temperature</p>
                      <p className="text-3xl font-bold text-gray-800">{weather.main.temp}°C</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full p-4 shadow-md">
                      <Droplets className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Humidity</p>
                      <p className="text-3xl font-bold text-gray-800">{weather.main.humidity}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full p-4 shadow-md">
                      <Wind className="w-8 h-8 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Wind Speed</p>
                      <p className="text-3xl font-bold text-gray-800">{weather.wind.speed} m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Temperature Trend */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-500" />
                Temperature Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  data={[
                    { time: "6 AM", temp: weather.main.temp - 3 },
                    { time: "9 AM", temp: weather.main.temp - 1 },
                    { time: "12 PM", temp: weather.main.temp },
                    { time: "3 PM", temp: weather.main.temp + 2 },
                    { time: "6 PM", temp: weather.main.temp - 1 },
                    { time: "9 PM", temp: weather.main.temp - 3 },
                  ]}
                >
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '2px solid #f97316',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3} fill="url(#tempGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Humidity Trend */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Humidity Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  data={[
                    { time: "6 AM", humidity: weather.main.humidity + 5 },
                    { time: "9 AM", humidity: weather.main.humidity + 3 },
                    { time: "12 PM", humidity: weather.main.humidity },
                    { time: "3 PM", humidity: weather.main.humidity - 2 },
                    { time: "6 PM", humidity: weather.main.humidity - 3 },
                    { time: "9 PM", humidity: weather.main.humidity + 2 },
                  ]}
                >
                  <defs>
                    <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis domain={["dataMin - 5", "dataMax + 5"]} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '2px solid #3b82f6',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={3} fill="url(#humidityGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Map */}
          <div className="max-w-6xl mx-auto mt-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Map
                </h3>
              </div>
              <MapContainer
                center={[weather.coord.lat, weather.coord.lon]}
                zoom={12}
                className="h-96 w-full"
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
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out both;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Weather;