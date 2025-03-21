const express = require("express");
const Advisory = require("../models/Advisory");

const router = express.Router();

//to add adviosries in mongoDB (post)
router.post("/add", async (req, res) => {
    try {
        const { user, advisory } = req.body;

        //validate input
        if (!user || !advisory) {
            return res.status(400).json({ error: "User and advisory are required!" });
        }

        //storing in mongoDB
        const newAdvisory = new Advisory({ user, advisory });
        await newAdvisory.save();

        res.json({ message: "Advisory saved successfully!" });
    } catch (error) {
        console.error("Error saving advisory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//route to fetch all advisories (GET) 
router.get("/getAll", async (req, res) => {
    try {
        const advisories = await Advisory.find().sort({ createdAt: -1 });
        res.json(advisories);
    } catch (error) {
        console.error("Error fetching advisories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
