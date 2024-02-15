const express = require('express');
const userService = require('../service/user-service');
const handleError = require('../errors/error-handler');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        return res.status(200).json({
            message: 'Success',
            data: users,
        });
    } catch (error) {
        const errorResponse = handleError(error);

        return res.status(errorResponse.status).json(errorResponse);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        return res.status(200).json({
            message: 'Success',
            data: user,
        });
    } catch (error) {
        const errorResponse = handleError(error);

        return res.status(errorResponse.status).json(errorResponse);
    }
});

router.post('/create', async (req, res) => {
    try {
        const user = req.body;
        const createdUser = await userService.createUser(user);

        if (!createdUser) {
            throw new Error('User not created');
        }

        return res.status(201).json({
            message: 'Success',
            data: createdUser,
        });
    } catch (error) {
        const errorResponse = handleError(error);

        return res.status(errorResponse.status).json(errorResponse);
    }
});

router.post('/update', async (req, res) => {
    const userToUpdate = req.body;

    if (!userToUpdate._id) {
        return res.status(400).json({
            message: 'User ID is required',
        });
    }

    try {
        const updatedUser = await userService.updateUser(
            userToUpdate._id,
            userToUpdate
        );

        return res.status(200).json({
            message: 'Success',
            data: updatedUser,
        });
    } catch (error) {
        const errorResponse = handleError(error);

        return res.status(errorResponse.status).json(errorResponse);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);

        return res.status(200).json({
            message: 'Success',
        });
    } catch (error) {
        const errorResponse = handleError(error);

        return res.status(errorResponse.status).json(errorResponse);
    }
});

module.exports = router;
