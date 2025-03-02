// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from `Authorization` header (Bearer token)

    if (!token) {
        return res.status(401).json({
            message: 'Access Denied. No token provided.',
            status: false,
            success: false,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
        req.user = decoded; // Attach decoded user information to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({
            message: 'Invalid token',
            status: false,
            success: false,
        });
    }
};

module.exports = authenticateToken;
