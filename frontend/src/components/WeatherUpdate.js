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
        <div style={{ backgroundColor: "#F5DEB3", minHeight: "91vh", padding: "20px" }}>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ 
                    maxWidth: "400px", 
                    margin: "auto", 
                    padding: "20px", 
                    textAlign: "center", 
                    border: "1px solid #ddd", 
                    borderRadius: "15px", 
                    backgroundColor: "#FAF3E0", 
                }}
            >
                <h2>🌤 Weather Update</h2>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ 
                        padding: "10px", 
                        width: "80%", 
                        marginBottom: "10px", 
                        borderRadius: "5px", 
                        border: "1px solid #ccc" 
                    }}
                />
                <br />
                <motion.button 
                    onClick={fetchWeather} 
                    style={{ 
                        padding: "10px 20px", 
                        border: "none", 
                        backgroundColor: "#066b06", 
                        color: "white", 
                        borderRadius: "5px", 
                        cursor: "pointer",
                        fontWeight: "bold" 
                    }}
                    whileTap={{ scale: 0.9 }} 
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} 
                >
                    Get Weather
                </motion.button>

                {loading && <p>Loading...</p>}
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ color: "red" }}>{error}</motion.p>}

                {weather && (
                    <motion.div 
                        key={weather.location}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        transition={{ type: "spring", stiffness: 80, damping: 15 }} 
                        style={{ 
                            marginTop: "20px", 
                            padding: "10px", 
                            background: "#FAF3E0",  // Updated background color
                            borderRadius: "10px", 
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" 
                        }}
                    >
                        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            {weather.location}
                        </motion.h3>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                            🌡 Temperature: {weather.temperature}°C
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <WiHumidity /> Humidity: {weather.humidity}%
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <WiStrongWind /> Wind Speed: {weather.wind_speed} m/s
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                            🌦 Condition: {weather.weather}
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default WeatherUpdate;
