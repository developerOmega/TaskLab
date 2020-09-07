const { TasksController } = require('../controllers/v1/tasksController');
const express = require('express');
const app = express();

app.get('/api/v1/tasks', TasksController.index );
app.get('/api/v1/tasks/:id', TasksController.show );
app.post('/api/v1/tasks', TasksController.post );
app.put('/api/v1/tasks/:id', TasksController.update );
app.delete('/api/v1/tasks/:id', TasksController.destroy );

app.get('/api/v1/tasks/:id/users', TasksController.indexTasks);

module.exports = app;