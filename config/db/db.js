const mongoose = require('mongoose');
const { mongoConnectionString } = require('../config');

mongoose.connect(mongoConnectionString);

module.exports = mongoose;
