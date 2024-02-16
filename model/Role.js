const mongoose = require('../config/db/db');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        uppercase: true,
    },
});

module.exports = mongoose.model('role', roleSchema);
