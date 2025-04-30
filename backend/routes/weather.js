const express = require("express");
const axios = require("axios");//alternative for "fetch" api-calls 
const NodeCache = require("node-cache"); //node library for caching 


const router = express.Router(); //for handling internal routes -> /getWeather
const weatherCache = new NodeCache({ stdTTL: 600 }); // cache TTL = 10 minutes
const API_KEY = "9073a2b97c439441b2de3949945090ba"; // app key

router.get("/getWeather", async (req, res) => {
    const { city } = req.query;  //query from user-> cityname
    if (!city) return res.status(400).json({ error: "City name is required!" });

    const cachedData = weatherCache.get(city); //checking if "city" exits in weathercache
    if (cachedData) {
        console.log("Serving from cache");
        return res.json(cachedData); //return the cached data without hitting the api call
    }

    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(weatherUrl);

        const result = {
            location: response.data.name,
            temperature: response.data.main.temp,
            weather: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
            
        };

        weatherCache.set(city, result);
        console.log("Fetching new data from API");
        res.json(result);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

module.exports = router;
