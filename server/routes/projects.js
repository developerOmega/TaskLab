const { ProjectsController } = require('../controllers/v1/projectsController');
const { authUser } = require('../middlewares/authJwt');
const { authProject, authProjectAdmin } = require('../middlewares/authElements');
const express = require('express');
const app = express();

app.get('/api/v1/projects', authUser, ProjectsController.index );
app.get('/api/v1/projects/:id', [authUser, authProject], ProjectsController.show );
app.post('/api/v1/projects', [authUser], ProjectsController.post );
app.put('/api/v1/projects/:id', [authUser, authProjectAdmin], ProjectsController.update );
app.delete('/api/v1/projects/:id', [authUser, authProjectAdmin], ProjectsController.delete );

app.get('/api/v1/projects/:id/user', [authUser], ProjectsController.showUser);
app.get('/api/v1/projects/:id/users', [authUser], ProjectsController.indexUsers);
app.get('/api/v1/projects/:id/messages', [authUser, authProject], ProjectsController.indexMessages);
app.get('/api/v1/projects/:id/events', [authUser, authProject], ProjectsController.indexEvents);
app.get('/api/v1/projects/:id/tasks', [authUser, authProject], ProjectsController.indexTasks);

module.exports = app;