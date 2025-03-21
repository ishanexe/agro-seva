const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://ishan:toofan24@i-notebook.e1yw8.mongodb.net/agroseva?retryWrites=true&w=majority";

const connectToMongo = async () => {
    try {
        if (mongoose.connection.readyState === 0) {  // Ensure only one connection
            await mongoose.connect(mongoURI);
            console.log("✅ Connected to MongoDB...");
        }
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);  // Stop server if connection fails
    }
};

module.exports = connectToMongo;
