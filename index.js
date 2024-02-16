const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { port } = require('./config/config');
const { checkUser } = require('./service/auth-service');

const app = express();
const PORT = port || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

// Middleware
app.get('*', checkUser);

// Controllers
app.use(require('./controller/home-controller'));
app.use('/auth', require('./controller/auth-controller'));
app.use('/users', require('./controller/user-controller'));
app.use('/dashboard', require('./controller/dashboard-controller'));

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

module.exports = {app, server};