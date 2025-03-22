import React, { useState } from "react";
import axios from "axios";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { motion } from "framer-motion";

const WeatherUpdate = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        if (!city) {
            setError("Please enter a city name.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`http://localhost:5000/api/weather/getWeather?city=${city}`);
            setWeather(response.data);
        } catch (err) {
            setError("Failed to fetch weather data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center", border: "1px solid #ddd", borderRadius: "15px", backgroundColor: "#f0f8ff" }}>
            <h2>🌤 Weather Update</h2>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: "10px", width: "80%", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <br />
            <motion.button 
                onClick={fetchWeather} 
                style={{ padding: "10px 20px", border: "none", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" }}
                whileTap={{ scale: 0.9 }} // Button press animation
            >
                Get Weather
            </motion.button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <motion.div 
                    key={weather.location} // Forces re-render for animation replay
                    initial={{ opacity: 0, y: -20, scale: 0.9 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                    style={{ marginTop: "20px", padding: "10px", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}
                >
                    <h3>{weather.location}</h3>
                    <p>🌡 Temperature: {weather.temperature}°C</p>
                    <p><WiHumidity /> Humidity: {weather.humidity}%</p>
                    <p><WiStrongWind /> Wind Speed: {weather.wind_speed} m/s</p>
                    <p>🌦 Condition: {weather.weather}</p>
                </motion.div>
            )}
        </div>
    );
};

export default WeatherUpdate;
