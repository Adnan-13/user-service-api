const express = require('express');
const userService = require('../service/user-service');
const handleError = require('../errors/error-handler');
const roleService = require('../service/role-service');
const authService = require('../service/auth-service');

const router = express.Router();

router.get('/', authService.requireAuth, async (req, res) => {
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

router.get('/:id', authService.requireAuth, async (req, res) => {
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

router.post(
    '/create',
    authService.checkUser,
    authService.requireRole('ADMIN'),
    async (req, res) => {
        try {
            const user = req.body;

            const createdUser = await userService.createUser(user);
            roleService.addRoleToUser(createdUser._id, 'BASIC_USER');

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
    }
);

router.post(
    '/update',
    authService.checkUser,
    roleService.checkRoleModification,
    async (req, res) => {
        const userToUpdate = req.body;

        if (!userToUpdate._id) {
            return res.status(400).json({
                message: 'User ID is required',
            });
        }

        const currentUser = res.locals.currentUser;
        const admin_role = await roleService.getRoleByName('ADMIN');

        if (
            currentUser._id !== userToUpdate._id &&
            !currentUser.roles.includes(admin_role._id)
        ) {
            return res.status(403).json({
                message: 'Unauthorized',
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
    }
);

router.delete('/:id', authService.checkUser, async (req, res) => {
    const currentUser = res.locals.currentUser;

    const admin_role = await roleService.getRoleByName('ADMIN');

    if (
        currentUser._id !== req.params.id &&
        !currentUser.roles.includes(admin_role._id)
    ) {
        return res.status(403).json({
            message: 'Unauthorized',
        });
    }

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

router.post(
    '/add-role',
    authService.checkUser,
    authService.requireRole('ADMIN'),
    async (req, res) => {
        try {
            const { userId, role } = req.body;

            const user = await roleService.addRoleToUser(userId, role);

            return res.status(200).json({
                message: 'Success',
                data: user,
            });
        } catch (error) {
            const errorResponse = handleError(error);

            return res.status(errorResponse.status).json(errorResponse);
        }
    }
);

router.post(
    '/remove-role',
    authService.checkUser,
    authService.requireRole('ADMIN'),
    async (req, res) => {
        try {
            const { userId, role } = req.body;

            const user = await roleService.removeRoleFromUser(userId, role);

            return res.status(200).json({
                message: 'Success',
                data: user,
            });
        } catch (error) {
            const errorResponse = handleError(error);

            return res.status(errorResponse.status).json(errorResponse);
        }
    }
);

module.exports = router;
