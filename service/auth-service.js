const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpireTime } = require('../config/config');

class AuthService {
    async authenticateUser(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        return user;
    }
    generateToken(id, email) {
        return jwt.sign({ id, email }, jwtSecret, {
            expiresIn: jwtExpireTime,
        });
    }
}

module.exports = new AuthService();
