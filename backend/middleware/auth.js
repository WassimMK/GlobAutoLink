const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Check if cookies exist first
    if (!req.cookies) {
        req.user = null;
        return next();
    }
    
    const token = req.cookies.jwt;
    
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'fallback_secret');
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.clearCookie('jwt');
        req.user = null;
        next();
    }
};
exports.requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Accès refusé : réservée aux administrateurs.');
    }
    next();
};
