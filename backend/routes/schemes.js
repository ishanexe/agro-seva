const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Route to return JSON data
router.get("/getSchemes", (req, res) => {
    const filePath = path.join(__dirname, "../schemes.json");

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Schemes data not found. Try again later." });
    }

    try {
        const data = fs.readFileSync(filePath, "utf-8");
        res.json(JSON.parse(data));
    } catch (error) {
        console.error("❌ Error reading schemes.json:", error);
        res.status(500).json({ error: "Failed to read schemes data" });
    }
});

module.exports = router;
