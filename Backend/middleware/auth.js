// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
