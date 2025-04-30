const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const scrapeSchemes = require("./scrapes");
const Scheme = require("./models/Scheme");

// Connect to MongoDB
connectToMongo();

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/crops", require("./routes/crops"));
app.use("/api/weather", require("./routes/weather"));
app.use("/api/schemes", require("./routes/schemes"));
app.use('/api/advisory', require('./routes/advisory'));
// app.use("/api/ml", require("./routes/mlRoute")); 


// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
