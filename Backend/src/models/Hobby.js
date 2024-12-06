const mongoose = require('mongoose');

const HobbySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure hobby names are unique
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true, // e.g., "Art", "Sports", etc.
    },
});

module.exports = mongoose.model('Hobby', HobbySchema);
