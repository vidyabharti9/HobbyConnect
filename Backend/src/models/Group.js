// models/Group.js

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    hobby: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track members
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Store creator (owner) of the group
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
