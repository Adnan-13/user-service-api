const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config/config');

const app = express();
const PORT = port || 3000;

app.use(bodyParser.json());

// Controllers
app.use(require('./controller/home-controller'));
app.use('/user', require('./controller/user-controller'));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
