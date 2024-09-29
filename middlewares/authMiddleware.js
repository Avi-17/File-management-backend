const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  const bearerToken = token.split(' ')[1]; // Extract token after 'Bearer'
  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;
