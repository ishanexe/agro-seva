const express = require("express");
const axios = require("axios");

const router = express.Router();

// Replace with your actual ML model API URL
const ML_MODEL_URL = "https://your-hosted-model-link.com/predict";

// Route to send data to the ML model and get predictions
router.post("/predict", async (req, res) => {
    try {
        const inputData = req.body;

        // Validate input
        if (!inputData || Object.keys(inputData).length === 0) {
            return res.status(400).json({ error: "Input data is required!" });
        }

        // Send data to the hosted ML model
        const response = await axios.post(ML_MODEL_URL, inputData);

        // Return the model's prediction response
        res.json(response.data);
    } catch (error) {
        console.error("Error calling ML model:", error.message);
        res.status(500).json({ error: "Failed to get prediction" });
    }
});

module.exports = router;
