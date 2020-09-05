const { ProjectsController } = require('../controllers/v1/projectsController');
const express = require('express');
const app = express();

app.get('/api/v1/projects', ProjectsController.index );
app.get('/api/v1/projects/:id', ProjectsController.show );
app.post('/api/v1/projects', ProjectsController.post );
app.put('/api/v1/projects/:id', ProjectsController.update );
app.delete('/api/v1/projects/:id', ProjectsController.delete );

app.get('/api/v1/projects/:id/user', ProjectsController.showUser);
app.get('/api/v1/projects/:id/users', ProjectsController.indexUsers);
app.get('/api/v1/projects/:id/messages', ProjectsController.indexMessages);
app.get('/api/v1/projects/:id/events', ProjectsController.indexEvents);
app.get('/api/v1/projects/:id/tasks', ProjectsController.indexTasks);

module.exports = app;