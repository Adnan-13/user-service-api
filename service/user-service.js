const User = require('../model/User');
const mongoose = require('../config/db/db');

class UserService {
    async getAllUsers() {
        const result = await User.find();
        return result;
    }

    async getUserById(userId) {
        const user = await User.findById(userId);
        return user;
    }

    async createUser(user) {
        const createdUser = await User.create(user);
        return createdUser;
    }

    async updateUser(userId, updatedUser) {
        const currentUser = await User.findById(userId);

        if (!currentUser) {
            throw new Error('User not found');
        }

        // currentUser = { ...currentUser, ...updatedUser };

        Object.keys(updatedUser).forEach((key) => {
            currentUser[key] = updatedUser[key];
        });

        const result = currentUser.save();
        return result;
    }

    async deleteUser(userId) {
        const userExists = await User.exists({ _id: userId });

        if (!userExists) {
            throw new Error('User not found');
        }

        await User.deleteOne({ _id: userId });
    }
}

module.exports = new UserService();