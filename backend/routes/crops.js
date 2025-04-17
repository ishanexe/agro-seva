const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const mongoURI = "mongodb+srv://ishan:toofan24@i-notebook.e1yw8.mongodb.net/agroseva?retryWrites=true&w=majority";

async function connectToDB() {
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    return client.db("agroseva").collection("crop_prices");
}

// ✅ **Modify the Route to Accept POST Requests**
router.post("/getPrices", async (req, res) => {
    try {
        const { Commodity, District } = req.body; // Read from request body

        if (!Commodity || !District) {
            return res.status(400).json({ error: "Commodity and District are required!" });
        }

        const collection = await connectToDB(); 

        const query = { 
            Commodity: Commodity, // Exact match with database field names
            District: District
        };

        const data = await collection.find(query, {
            projection: { Market: 1, Grade: 1, "Min Price": 1, "Max Price": 1, "Modal Price": 1, _id: 0 }
        }).toArray();

        if (data.length === 0) {
            return res.status(404).json({ message: "No data found for given commodity and district." });
        }

        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
