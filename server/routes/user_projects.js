const { UserProductsController } = require('../controllers/v1/userProjectsController');
const { authUser } = require('../middlewares/authJwt');
const { authUserAdmin, authUserById } = require('../middlewares/authUserProjects');
const express = require('express');
const app = express();

app.post('/api/v1/user-products', [authUser, authUserAdmin], UserProductsController.post );
app.delete('/api/v1/user-products/:user_id/:project_id', [authUser, authUserById], UserProductsController.destroy);

module.exports = app;