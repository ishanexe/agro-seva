import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiHumidity, WiStrongWind } from "react-icons/wi";

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
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f0f8ff" }}>
            <h2>Weather Update</h2>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: "10px", width: "80%", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <br />
            <button onClick={fetchWeather} style={{ padding: "10px 20px", border: "none", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" }}>
                Get Weather
            </button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <div style={{ marginTop: "20px", padding: "10px", background: "#f8f9fa", borderRadius: "5px" }}>
                    <h3>{weather.location}</h3>
                    <p><WiDaySunny /> Temperature: {weather.temperature}°C</p>
                    <p><WiHumidity /> Humidity: {weather.humidity}%</p>
                    <p><WiStrongWind /> Wind Speed: {weather.wind_speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherUpdate;
