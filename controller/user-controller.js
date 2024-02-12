const express = require('express');
const userService = require('../service/user-service');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        return res.status(200).json({
            message: 'Success',
            data: users,
        });
    } catch (error) {
        console.error(`Error getting all users - ${error.message}`);

        return res.status(400).json({
            message: `Error getting all users - ${error.message}`,
        });
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
        console.error(`Error getting user by ID - ${error.message}`);

        return res.status(400).json({
            message: `Error getting user by ID - ${error.message}`,
        });
    }
});

router.post('/create', async (req, res) => {
    try {
        const user = req.body;
        const createdUser = await userService.createUser(user);

        if (!createdUser) {
            return res.status(400).json({
                message: 'Error creating user',
            });
        }

        return res.status(201).json({
            message: 'Success',
            data: createdUser,
        });
    } catch (error) {
        console.error(`Error creating user - ${error.message}`);

        return res.status(400).json({
            message: `Error creating user - ${error.message}`,
        });
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

        if (!updatedUser) {
            return res.status(400).json({
                message: 'Error updating user',
                data: updatedUser,
            });
        }

        return res.status(200).json({
            message: 'Success',
            data: updatedUser,
        });
    } catch (error) {
        console.error(`Error updating user - ${error.message}`);

        return res.status(400).json({
            message: `Error updating user - ${error.message}`,
        });
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
        console.error(`Error deleting user - ${error.message}`);

        return res.status(400).json({
            message: `Error deleting user - ${error.message}`,
        });
    }
});

module.exports = router;
