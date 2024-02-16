const express = require('express');
const { jwtExpireTime } = require('../config/config');
const authService = require('../service/auth-service');
const userService = require('../service/user-service');
const handleError = require('../errors/error-handler');
const roleService = require('../service/role-service');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const createdUser = await userService.createUser(user);
        await roleService.addRoleToUser(createdUser._id, 'BASIC_USER');
        const token = authService.generateToken(
            createdUser._id,
            createdUser.email
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: jwtExpireTime * 1000,
        });

        return res.status(201).json({
            message: 'Success',
            data: {
                userId: createdUser._id,
                userEmail: createdUser.email,
            },
        });
    } catch (error) {
        const errorResponse = handleError(error);

        return res.status(errorResponse.status).json(errorResponse);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.authenticateUser(email, password);
        const token = authService.generateToken(user._id, user.email);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: jwtExpireTime * 1000,
        });

        return res.status(200).json({
            message: 'Success',
            data: {
                userId: user._id,
                userEmail: user.email,
            },
        });
    } catch (error) {
        const errorResponse = handleError(error);

        return res.status(errorResponse.status).json(errorResponse);
    }
});

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});

module.exports = router;
