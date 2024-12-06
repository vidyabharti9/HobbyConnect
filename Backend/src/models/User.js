// backend/src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hobbies: [{ type: String }],  // Array of strings to store hobbies directly
  profilePicture: { type: String },
  badges: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
