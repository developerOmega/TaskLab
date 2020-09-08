const { TasksController } = require('../controllers/v1/tasksController');
const { authUser } = require('../middlewares/authJwt');
const { authTaskById, authTaksAdmin, authTaksAdminById } = require('../middlewares/authTasks');
const express = require('express');
const app = express();

// app.get('/api/v1/tasks', TasksController.index );
app.get('/api/v1/tasks/:id', [authUser, authTaskById], TasksController.show ); //SOLO USUARIO DEL PROYECTO
app.post('/api/v1/tasks', [authUser, authTaksAdmin], TasksController.post ); //SOLO USUARIOS ADMINISTRADORES
app.put('/api/v1/tasks/:id', [authUser ,authTaksAdminById], TasksController.update ); //SOLO USUARIOS ADMINISTRADORES
app.delete('/api/v1/tasks/:id', [authUser ,authTaksAdminById], TasksController.destroy ); //SOLO USUARIOS ADMINISTRADORES

app.get('/api/v1/tasks/:id/users', [authUser, authTaskById], TasksController.indexTasks);

module.exports = app;