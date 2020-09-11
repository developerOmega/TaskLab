const { UserTasksController } = require('../controllers/v1/userTasksController');
const { authUser } = require('../middlewares/authJwt');
const { authUserTaskAdmin, authUserTaskAdminById, validateUserTask } = require('../middlewares/authUserTasks');
const express = require('express');
const app = express();

app.post('/api/v1/user-tasks', [authUser, authUserTaskAdmin], UserTasksController.post );
app.delete('/api/v1/user-tasks/:user_id/:task_id', [authUser, validateUserTask, authUserTaskAdminById], UserTasksController.destroy );

module.exports = app;