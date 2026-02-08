const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  jwt.verify(token, authConfig.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};
