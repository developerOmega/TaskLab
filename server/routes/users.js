const { UsersController } = require('../controllers/v1/usersController');
const { authUser } = require('../middlewares/authJwt');
const { authUserReq } = require('../middlewares/authUser');
const express = require('express');
const app = express(); 

app.get('/api/v1/users', authUser, UsersController.index);
app.get('/api/v1/users/:id', authUser, UsersController.show);
app.post('/api/v1/users/', authUser, UsersController.post);
app.put('/api/v1/users/:id', [authUser, authUserReq], UsersController.update);
app.delete('/api/v1/users/:id', [authUser, authUserReq], UsersController.destroy);

app.get('/api/v1/users/:id/projects', [authUser], UsersController.indexProjects);

// app.get('/api/v1/users/:id/project', UsersController.showProject);
// app.get('/api/v1/users/:id/projects', UsersController.indexProjects);
// app.get('/api/v1/users/:id/messages', UsersController.indexMessages);
// app.get('/api/v1/users/:id/tasks', UsersController.indexTasks);

module.exports = app;

