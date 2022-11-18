const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const { name } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = name;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
