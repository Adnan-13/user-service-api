const express = require('express');
const { requireAuth, requireRole } = require('../service/auth-service');

const router = express.Router();

// Only authenticated users can access this route
router.get('/user', requireAuth, (req, res) => {
    return res.status(200).json({
        message: `Welcome to the dashboard, ${res.locals.currentUser.name}!`,
    });
});

// Only authenticated users with the ADMIN role can access this route
router.get('/admin', requireRole('ADMIN'), (req, res) => {
    return res.status(200).json({
        message: `Welcome to the admin dashboard, ${res.locals.currentUser.name}!`,
    });
});

// Only authenticated users with the MODERATOR role can access this route
router.get('/moderator', requireRole('MODERATOR'), (req, res) => {
    return res.status(200).json({
        message: `Welcome to the moderator dashboard, ${res.locals.currentUser.name}!`,
    });
});

module.exports = router;
