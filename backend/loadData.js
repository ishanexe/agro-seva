const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");

// MongoDB Atlas Connection URI
const mongoURI = "mongodb+srv://ishan:toofan24@i-notebook.e1yw8.mongodb.net/agroseva?retryWrites=true&w=majority";
const dbName = "agroseva"; // Database Name
const collectionName = "crop_prices"; // Collection Name

// Connect to MongoDB Atlas
async function connectToMongoDB() {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    return client.db(dbName);
}

// Function to Load CSV into MongoDB Atlas
async function loadCSVtoMongo() {
    const db = await connectToMongoDB();
    const collection = db.collection(collectionName);

    let data = [];
    fs.createReadStream("cropPrice.csv") // Ensure this file exists in the same directory
        .pipe(csv())
        .on("data", (row) => {
            data.push(row);
        })
        .on("end", async () => {
            if (data.length > 0) {
                await collection.insertMany(data);
                console.log("✅ Data successfully inserted into MongoDB Atlas!");
            } else {
                console.log("⚠️ No data found in CSV!");
            }
            process.exit();
        });
}

// Run the function
loadCSVtoMongo().catch(console.error);
