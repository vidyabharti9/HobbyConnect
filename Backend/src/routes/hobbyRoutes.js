// backend/src/routes/hobbyRoutes.js
const express = require('express');
const router = express.Router(); // Initialize the router
const Hobby = require('../models/Hobby'); // Assuming you have a Hobby model

// Route for hobby recommendations
router.get('/recommendations', async (req, res) => {
  try {
    // Fetch hobby recommendations (example logic, update as needed)
    const recommendations = await Hobby.find(); // Adjust query as necessary
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching hobby recommendations:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; // Export the router
