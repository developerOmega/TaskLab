const { UserAuthController } = require('../controllers/v1/userAuthController');;
const express = require('express');
const app = express();

app.post('/api/v1/login/users', UserAuthController.login);

module.exports = app



