const { UsersController } = require('../controllers/v1/usersController');
const { authUser } = require('../middlewares/authJwt');
const { authUserById, validateUser, validateUsersPag } = require('../middlewares/authUser');
const express = require('express');
const app = express();

// Rutas de usuarios: Version 1
// Peticiones -> get: mostrar todo, get: mostrar por id, post: insertar, put: actualizar, delete: eliminar

app.get('/api/v1/users', [authUser, validateUsersPag], UsersController.index);
app.get('/api/v1/users/:id', [authUser, validateUser], UsersController.show);
app.post('/api/v1/users/', UsersController.post);
app.put('/api/v1/users/:id', [authUser, authUserById], UsersController.update);
app.delete('/api/v1/users/:id', [authUser, authUserById], UsersController.destroy);

// Peticiones por user_id -> get: mostrar proyectos

app.get('/api/v1/users/:id/projects', [authUser, validateUser], UsersController.indexProjects);

// app.get('/api/v1/users/:id/project', UsersController.showProject);
// app.get('/api/v1/users/:id/projects', UsersController.indexProjects);
// app.get('/api/v1/users/:id/messages', UsersController.indexMessages);
// app.get('/api/v1/users/:id/tasks', UsersController.indexTasks);

module.exports = app;

