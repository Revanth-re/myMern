
const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log(authHeader,"token in verify");

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
console.log(token,"token in verify");

  try {
    const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || "your_jwt_secret_here";
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded._id || decoded.id; // support tokens with either _id or id
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = VerifyToken;
