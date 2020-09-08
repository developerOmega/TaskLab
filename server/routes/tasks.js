const { TasksController } = require('../controllers/v1/tasksController');
const express = require('express');
const app = express();

// app.get('/api/v1/tasks', TasksController.index );
app.get('/api/v1/tasks/:id', TasksController.show ); //SOLO USUARIO DEL PROYECTO
app.post('/api/v1/tasks', TasksController.post ); //SOLO USUARIOS ADMINISTRADORES
app.put('/api/v1/tasks/:id', TasksController.update ); //SOLO USUARIOS ADMINISTRADORES
app.delete('/api/v1/tasks/:id', TasksController.destroy ); //SOLO USUARIOS ADMINISTRADORES

app.get('/api/v1/tasks/:id/users', TasksController.indexTasks);

module.exports = app;