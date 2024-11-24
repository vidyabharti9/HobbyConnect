// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Use Routes
app.use("/api", loginRoutes);    // Login route
app.use("/api", signupRoutes);   // Signup route (use "/api" here instead of "/api/signup")

// Default route to handle all invalid paths
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
