// backend/src/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  hobby: { type: mongoose.Schema.Types.ObjectId, ref: 'Hobby', required: true },
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
