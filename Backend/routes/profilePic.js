// backend/routes/profilePic.js
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the 'uploads' folder to save files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)); // Add a unique suffix to the filename
  }
});

const upload = multer({ storage: storage });

// Profile picture upload route
router.post("/uploadProfilePic", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Save file info to the database (optional)
  const profilePicUrl = `http://localhost:5000/uploads/${req.file.filename}`; // URL to access the uploaded image
  
  // Assuming you have a User model, you can update the user's profile with the image URL
  // Example:
  // User.findByIdAndUpdate(req.user.id, { profilePic: profilePicUrl });

  res.status(200).json({
    message: "Profile picture uploaded successfully",
    profilePicUrl: profilePicUrl
  });
});

module.exports = router;
