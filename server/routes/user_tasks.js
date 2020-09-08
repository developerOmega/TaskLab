const { UserTasksController } = require('../controllers/v1/userTasksController');
const { authUser } = require('../middlewares/authJwt');
const express = require('express');
const app = express();

app.post('/api/v1/user-tasks', [authUser], UserTasksController.post );

module.exports = app;