const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config/config');

const app = express();
const PORT = port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        code: 200,
        status: 'success',
        message: 'Hi, The User Service is properly running',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
