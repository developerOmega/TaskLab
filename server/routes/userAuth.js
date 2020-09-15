const { UserAuthController } = require('../controllers/v1/userAuthController');;
const express = require('express');
const app = express();

// Rutas de autenticacion de usuario: Version 1
// Peticiones -> post: login

app.post('/api/v1/login/users', UserAuthController.login);

module.exports = app



