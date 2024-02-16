const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { port } = require('./config/config');

const app = express();
const PORT = port || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

// Controllers
app.use(require('./controller/home-controller'));
app.use('/auth', require('./controller/auth-controller'));
app.use('/users', require('./controller/user-controller'));
app.use('/dashboard', require('./controller/dashboard-controller'));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
