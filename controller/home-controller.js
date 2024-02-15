const express = require('express');
const handleError = require('../errors/error-handler');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hi, Welcome to the user service',
    });
});

router.get('/health', (req, res) => {
    try {
        const responseData = {
            requestTime: new Date().toISOString(),
            service: 'User Service',
            requestData: req.body,
        };

        return res.status(200).json({
            message: 'User Service is properly running',
            data: responseData,
        });
    } catch (error) {
        const errorResponse = handleError(error);

        return res.status(errorResponse.status).json(errorResponse);
    }
});

module.exports = router;
