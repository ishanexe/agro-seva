import React, { useState } from "react";
import axios from "axios";
import { WiHumidity, WiStrongWind, WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiDust } from "react-icons/wi";
import { BiSearch } from "react-icons/bi";
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

    // Handle enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    };

    // Get weather icon based on condition
    const getWeatherIcon = (condition) => {
        if (!condition) return <WiDaySunny size={60} color="#FF9900" />;
        
        const lowerCondition = condition.toLowerCase();
        
        if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
            return <WiDaySunny size={60} color="#FF9900" />;
        } else if (lowerCondition.includes('cloud')) {
            return <WiCloudy size={60} color="#AAAAAA" />;
        } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
            return <WiRain size={60} color="#4682B4" />;
        } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
            return <WiThunderstorm size={60} color="#555555" />;
        } else if (lowerCondition.includes('snow') || lowerCondition.includes('ice')) {
            return <WiSnow size={60} color="#FFFFFF" />;
        } else if (lowerCondition.includes('dust') || lowerCondition.includes('fog') || lowerCondition.includes('haze')) {
            return <WiDust size={60} color="#CCCCCC" />;
        } else {
            return <WiDaySunny size={60} color="#FF9900" />;
        }
    };

    return (
        <div style={{ 
            background: "linear-gradient(135deg, #FAEBCD, #F5DEB3)", 
            minHeight: "91vh", 
            padding: "40px 20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ 
                    maxWidth: "800px", 
                    margin: "auto",
                    textAlign: "center", 
                }}
            >
                <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    style={{
                        fontSize: "2.5rem", 
                        color: "#4B5320",
                        marginBottom: "30px",
                        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    Weather Forecast
                </motion.h1>
                
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        borderRadius: "15px",
                        padding: "30px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        marginBottom: "30px"
                    }}
                >
                    <h3 style={{ 
                        fontSize: "1.4rem", 
                        marginBottom: "20px", 
                        color: "#4B5320",
                        fontWeight: "500"
                    }}>
                        Enter city name to get weather updates
                    </h3>
                    
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        gap: "10px",
                        maxWidth: "500px",
                        margin: "0 auto"
                    }}>
                        <motion.div style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "400px"
                        }}>
                            <input
                                type="text"
                                placeholder="Enter city name"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                onKeyPress={handleKeyPress}
                                style={{ 
                                    padding: "14px 20px", 
                                    width: "100%", 
                                    borderRadius: "30px", 
                                    border: "2px solid #6B8E23",
                                    fontSize: "1rem",
                                    outline: "none",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                                }}
                            />
                            <BiSearch style={{
                                position: "absolute",
                                right: "20px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#6B8E23",
                                fontSize: "1.2rem"
                            }} />
                        </motion.div>
                        <motion.button 
                            onClick={fetchWeather} 
                            style={{ 
                                padding: "14px 30px", 
                                border: "none", 
                                backgroundColor: "#6B8E23", 
                                color: "white", 
                                borderRadius: "30px", 
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "1rem",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                minWidth: "140px"
                            }}
                            whileTap={{ scale: 0.95 }} 
                            whileHover={{ 
                                scale: 1.03, 
                                backgroundColor: "#556B2F",
                                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
                                transition: { duration: 0.2 } 
                            }} 
                        >
                            Get Weather
                        </motion.button>
                    </div>

                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            style={{ 
                                display: "flex", 
                                justifyContent: "center", 
                                marginTop: "20px" 
                            }}
                        >
                            <div style={{ 
                                width: "40px", 
                                height: "40px", 
                                border: "4px solid rgba(107, 142, 35, 0.3)", 
                                borderTop: "4px solid #6B8E23", 
                                borderRadius: "50%", 
                                animation: "spin 1s linear infinite" 
                            }} />
                        </motion.div>
                    )}
                    
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.5 }} 
                            style={{ 
                                color: "white",
                                background: "#E57373",
                                padding: "12px 20px",
                                borderRadius: "8px",
                                marginTop: "20px",
                                display: "inline-block"
                            }}
                        >
                            {error}
                        </motion.div>
                    )}
                </motion.div>

                {weather && (
                    <motion.div 
                        key={weather.location + weather.temperature}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        transition={{ type: "spring", stiffness: 80, damping: 15 }} 
                        style={{ 
                            background: "rgba(255,255,255,0.85)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px", 
                            padding: "30px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                            overflow: "hidden",
                            position: "relative"
                        }}
                    >
                        <motion.div 
                            className="weather-card-content"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <motion.h2 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ duration: 0.5 }}
                                style={{
                                    fontSize: "2rem",
                                    color: "#4B5320",
                                    marginBottom: "10px"
                                }}
                            >
                                {weather.location}
                            </motion.h2>
                            
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                transition={{ duration: 0.5, delay: 0.2 }}
                                style={{ marginBottom: "15px" }}
                            >
                                {getWeatherIcon(weather.weather)}
                            </motion.div>
                            
                            <motion.p 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ delay: 0.3 }}
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: "500",
                                    marginBottom: "5px",
                                    color: "#444"
                                }}
                            >
                                {weather.weather}
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ delay: 0.4 }}
                                style={{
                                    fontSize: "3rem",
                                    fontWeight: "bold",
                                    margin: "10px 0 20px",
                                    color: "#4B5320"
                                }}
                            >
                                {weather.temperature}°C
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ delay: 0.5 }}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    width: "100%",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                    margin: "10px 0"
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px 20px",
                                    background: "rgba(107,142,35,0.1)",
                                    borderRadius: "12px",
                                    minWidth: "160px"
                                }}>
                                    <WiHumidity size={35} color="#6B8E23" style={{ marginRight: "10px" }} />
                                    <div>
                                        <div style={{ fontSize: "0.9rem", color: "#666" }}>Humidity</div>
                                        <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#4B5320" }}>{weather.humidity}%</div>
                                    </div>
                                </div>
                                
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px 20px",
                                    background: "rgba(107,142,35,0.1)",
                                    borderRadius: "12px",
                                    minWidth: "160px"
                                }}>
                                    <WiStrongWind size={35} color="#6B8E23" style={{ marginRight: "10px" }} />
                                    <div>
                                        <div style={{ fontSize: "0.9rem", color: "#666" }}>Wind Speed</div>
                                        <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#4B5320" }}>{weather.wind_speed} m/s</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default WeatherUpdate;
