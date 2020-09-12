const { FilesController } = require('../controllers/v1/filesController');
const { authUser } = require('../middlewares/authJwt');
const { authUserById, validateUser } = require('../middlewares/authUser');
const { validateFiles } = require('../middlewares/validateFiles');
const express = require('express');
const app = express();

app.post('/api/v1/files/users/:id', [authUser, authUserById, validateFiles, validateUser], FilesController.userPost);
app.put('/api/v1/files/users/:id', [authUser, authUserById, validateFiles, validateUser], FilesController.userUpdate);
app.delete('/api/v1/files/users/:id', [authUser, authUserById, validateUser], FilesController.userDestroy);

module.exports = app;