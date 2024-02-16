const express = require('express');
const handleError = require('../errors/error-handler');
const { requireAuth } = require('../service/auth-service');

const router = express.Router();

// Only authenticated users can access this route
router.get('/user', requireAuth, (req, res) => {
    return res.status(200).json({
        message: `Welcome to the dashboard, ${res.locals.currentUser.name}!`,
    });
});

module.exports = router;
