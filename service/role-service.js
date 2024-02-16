const Role = require('../model/Role');
const User = require('../model/User');

class RoleService {
    async getAllRoles() {
        const roles = await Role.find();
        return roles;
    }

    async getRoleByName(name) {
        const role = await Role.findOne({ name: name });
        return role;
    }

    async addRoleToUser(userId, role) {
        const user = await User.findById(userId);
        const roleToAdd = await Role.findOne({ name: role });

        if (!roleToAdd) {
            throw new Error('Role not found');
        }

        if (user.roles.includes(roleToAdd._id)) {
            throw new Error('Role already exists in user roles');
        }

        user.roles.push(roleToAdd);

        await user.save();

        return user;
    }

    async removeRoleFromUser(userId, role) {
        const user = await User.findById(userId);
        const roleToRemove = await Role.findOne({ name: role });

        if (!roleToRemove) {
            throw new Error('Role not found');
        }

        if (user.roles.includes(roleToRemove._id)) {
            user.roles.pull(roleToRemove._id);
        } else {
            throw new Error('Role not found in user roles');
        }

        await user.save();
    }

    checkRoleModification(req, res, next) {
        const currentUser = req.user;

        const rolesModified = req.body.roles;

        if (
            !rolesModified ||
            rolesModified.length === 0 ||
            currentUser.roles.includes('ADMIN')
        ) {
            return next();
        }

        return res.status(403).json({
            message: 'Unauthorized, only ADMIN can modify roles',
        });
    }
}

module.exports = new RoleService();
