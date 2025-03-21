const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model("Scheme", schemeSchema);
