const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const adminAuth = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "No token provided, authorization denied" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Get admin from token
        const admin = await Admin.findOne({ email: decoded.email });
        if (!admin) {
            return res.status(401).json({ error: "Admin not found" });
        }

        // Add admin info to request object
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token is not valid" });
    }
};

// Middleware to check if admin is accessing their own resources
const checkAdminOwnership = async (req, res, next) => {
    try {
        const resourceClubName = req.params.clubName || req.body.clubName;
        
        // If no clubName is provided in the request, move to next middleware
        // if (!resourceClubName) {
        //     return next();
        // }

        // Check if the admin is trying to access their own club's resources
        if (req.admin.clubName !== resourceClubName) {
            return res.status(403).json({ 
                error: "Unauthorized: You can only access resources for your own club" 
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Error checking resource ownership" });
    }
};

module.exports = { adminAuth, checkAdminOwnership };
