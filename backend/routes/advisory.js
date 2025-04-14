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

// Route to update an advisory (PUT)
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user, advisory } = req.body;

        // Validate input
        if (!user || !advisory) {
            return res.status(400).json({ error: "User and advisory are required!" });
        }

        // Update in MongoDB
        const updatedAdvisory = await Advisory.findByIdAndUpdate(
            id, 
            { user, advisory },
            { new: true } // Return the updated document
        );

        if (!updatedAdvisory) {
            return res.status(404).json({ error: "Advisory not found" });
        }

        res.json({ message: "Advisory updated successfully!", advisory: updatedAdvisory });
    } catch (error) {
        console.error("Error updating advisory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to delete an advisory (DELETE)
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedAdvisory = await Advisory.findByIdAndDelete(id);
        
        if (!deletedAdvisory) {
            return res.status(404).json({ error: "Advisory not found" });
        }

        res.json({ message: "Advisory deleted successfully!" });
    } catch (error) {
        console.error("Error deleting advisory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
