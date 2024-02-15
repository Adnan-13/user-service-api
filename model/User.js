const mongoose = require('../config/db/db');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters'],
        select: false,
    },
    dob: Date,
    enabled: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    },
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

module.exports = mongoose.model('user', userSchema);
