const { UsersController } = require('../controllers/v1/usersController');
const { authUser } = require('../middlewares/authJwt');
const { authUserById, validateUser, validateUsersPag } = require('../middlewares/authUser');
const express = require('express');
const app = express();


app.get('/api/v1/users', [authUser, validateUsersPag], UsersController.index);
app.get('/api/v1/users/:id', [authUser, validateUser], UsersController.show);
app.post('/api/v1/users/', UsersController.post);
app.put('/api/v1/users/:id', [authUser, authUserById], UsersController.update);
app.delete('/api/v1/users/:id', [authUser, authUserById], UsersController.destroy);

app.get('/api/v1/users/:id/projects', [authUser, validateUser], UsersController.indexProjects);
app.get('/api/v1/users/search/:search', authUser, UsersController.search);
app.put('/api/v1/user/:id/password', [authUser, authUserById], UsersController.updatePassword);
app.delete('/app/v1/user/:id/inactive', [authUser, authUserById], UsersController.inactive);

// app.get('/api/v1/users/:id/project', UsersController.showProject);
// app.get('/api/v1/users/:id/projects', UsersController.indexProjects);
// app.get('/api/v1/users/:id/messages', UsersController.indexMessages);
// app.get('/api/v1/users/:id/tasks', UsersController.indexTasks);

module.exports = app;

