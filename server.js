const express = require('express');
const bodyParser = require('body-parser');
const login = require('./routes/login');
const createProject = require('./routes/project');
const config = require('./helpers/config');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(login);
app.use(createProject);

app.listen(config.port, function () {
    console.log('Server runing!');
});