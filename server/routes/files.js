const { FilesController } = require('../controllers/v1/filesController');
const { authUser } = require('../middlewares/authJwt');
const { authUserById, validateUser } = require('../middlewares/authUser');
const { validateFiles } = require('../middlewares/validateFiles');
const express = require('express');
const app = express();

app.post('/api/v1/files/users/:id', [authUser, authUserById, validateFiles, validateUser], FilesController.user);

module.exports = app;