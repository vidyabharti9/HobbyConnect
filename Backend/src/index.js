const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('HobbyConnect Backend is running');
});

// User Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Hobby Routes
const hobbyRoutes = require('./routes/hobbyRoutes');
app.use('/api/hobbies', hobbyRoutes);

// Add Group Routes
const groupRoutes = require('./routes/groupRoutes'); // Import group routes
console.log("index run")
app.use('/api/groups', groupRoutes); // Add the group routes under /api/groups

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
