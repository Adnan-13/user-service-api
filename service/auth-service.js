const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpireTime } = require('../config/config');
const roleService = require('./role-service');

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

    requireAuth(req, res, next) {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Unauthorized',
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
    }

    requireRole(role) {
        return async (req, res, next) => {
            const user = res.locals.currentUser;

            if (!user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }

            const rolesInDb = await roleService.getAllRoles();

            const roleToCheck = rolesInDb.find((r) => r.name === role);

            if (user.roles.includes(roleToCheck._id)) {
                return next();
            }

            return res.status(401).json({
                message: 'Unauthorized',
            });
        };
    }

    checkUser(req, res, next) {
        let currentUser = null;

        const token = req.cookies.jwt;

        if (!token) {
            return next();
        }

        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                return next();
            } else {
                currentUser = await User.findById(decodedToken.id);
                res.locals.currentUser = currentUser;
                return next();
            }
        });
    }

    generateToken(id, email) {
        return jwt.sign({ id, email }, jwtSecret, {
            expiresIn: jwtExpireTime,
        });
    }
}

module.exports = new AuthService();
