const mongoose = require("mongoose");

// Define the schema for storing advisories
const AdvisorySchema = new mongoose.Schema({
    user: { type: String, required: true },
    advisory: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create and export the model
module.exports = mongoose.model("Advisory", AdvisorySchema);
