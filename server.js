const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const login = require('./routes/login');
const config = require('./helpers/config');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(login);

app.listen(config.port, function () {
    console.log('Server runing!');
});