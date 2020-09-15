const { ProjectsController } = require('../controllers/v1/projectsController');
const { authUser } = require('../middlewares/authJwt');
const { authProject, authProjectAdmin, validateProject, validateProjectsPag } = require('../middlewares/authProjects');
const express = require('express');
const app = express();

// Rutas de proyectos: Version 1
// Peticiones -> get: mostrar todo, get: mostrar por id, post: insertar, put: actualizar, delete: eliminar

app.get('/api/v1/projects', [authUser, validateProjectsPag], ProjectsController.index );
app.get('/api/v1/projects/:id', [authUser, validateProject, authProject], ProjectsController.show );
app.post('/api/v1/projects', [authUser], ProjectsController.post );
app.put('/api/v1/projects/:id', [authUser, validateProject, authProjectAdmin], ProjectsController.update );
app.delete('/api/v1/projects/:id', [authUser, validateProject, authProjectAdmin], ProjectsController.delete );

// Peticiones por project_id: get: mostrar usuario, get: mostrar usuarios , get: mostrar mensajes, get: mostrar eventos, get: mostrar tareas

app.get('/api/v1/projects/:id/user', [authUser], ProjectsController.showUser);
app.get('/api/v1/projects/:id/users', [authUser], ProjectsController.indexUsers);
app.get('/api/v1/projects/:id/messages', [authUser, authProject], ProjectsController.indexMessages);
app.get('/api/v1/projects/:id/events', [authUser, authProject], ProjectsController.indexEvents);
app.get('/api/v1/projects/:id/tasks', [authUser, authProject], ProjectsController.indexTasks);

module.exports = app;