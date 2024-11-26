// backend/routes/upload.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the file name
  },
});

const upload = multer({ storage: storage });

// Route to handle profile picture upload
router.post('/uploadProfilePic', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Process the uploaded file here (e.g., save to database or cloud storage)
    res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
