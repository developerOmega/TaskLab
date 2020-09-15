const { TasksController } = require('../controllers/v1/tasksController');
const { authUser } = require('../middlewares/authJwt');
const { authTaskById, authTaksAdmin, authTaksAdminById, validateTask, validateUsersByTask } = require('../middlewares/authTasks');
const express = require('express');
const app = express();

// Rutas de tareas: Version 1
// Peticiones -> get: mostrar por id, post: insertar, put: actualizar, delete: eliminar

// app.get('/api/v1/tasks', TasksController.index );
app.get('/api/v1/tasks/:id', [authUser, validateTask, authTaskById], TasksController.show ); //SOLO USUARIO DEL PROYECTO
app.post('/api/v1/tasks', [authUser, authTaksAdmin], TasksController.post ); //SOLO USUARIOS ADMINISTRADORES
app.put('/api/v1/tasks/:id', [authUser, validateTask, authTaksAdminById], TasksController.update ); //SOLO USUARIOS ADMINISTRADORES
app.delete('/api/v1/tasks/:id', [authUser, validateTask, authTaksAdminById], TasksController.destroy ); //SOLO USUARIOS ADMINISTRADORES

// Peticiones por task_id -> put: actualizar status, get: mostrar usuarios

app.put('/api/v1/tasks/:id/status', [authUser, validateUsersByTask], TasksController.updateStatus);
app.get('/api/v1/tasks/:id/users', [authUser, validateTask, authTaskById], TasksController.indexUsers);

module.exports = app;