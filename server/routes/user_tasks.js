const { UserTasksController } = require('../controllers/v1/userTasksController');
const express = require('express');
const app = express();

app.post('/api/v1/user-tasks', UserTasksController.post );

module.exports = app;