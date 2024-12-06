// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Register a new user
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp to avoid duplicates
    },
  });
  
  // File validation: Only allow image files (jpg, jpeg, png)
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.'), false); // Reject the file
    }
  };
  
  // Create multer upload middleware with file size limit (5MB for example)
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  });
  
  router.post('/register', upload.single('profilePicture'), async (req, res) => {
    const { name, email, password, hobbies } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Parse hobbies into an array
        const hobbiesArray = hobbies
            ? hobbies.split(',').map((hobby) => hobby.trim())
            : [];

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            hobbies: hobbiesArray,
            profilePicture,
        });

        await user.save();

        // Generate and send JWT
        jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                res.json({
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        hobbies: user.hobbies,
                        profilePicture: user.profilePicture ? `${baseUrl}/${user.profilePicture}` : null, // Full URL
                    },
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ msg: `File upload error: ${error.message}` });
        }
        res.status(500).send('Server error');
    }
});

  
  module.exports = router;



// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create and return JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
        console.log("backend", token)
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get user profile (Protected Route)
const auth = require('../middleware/auth');

router.get('/profile', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password').populate('hobbies', 'name'); // Populate only the 'name' field of hobbies
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;

// backend/src/routes/userRoutes.js
router.put('/profile', auth, async (req, res) => {
    const { name, email, hobbies, profile_image, achievements } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, // Get the user's ID from the token
            { name, email, hobbies, profile_image, achievements },
            { new: true, runValidators: true } // Return the updated user and apply validators
        ).select('-password'); // Exclude the password from the response

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(updatedUser); // Send the updated user data
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

