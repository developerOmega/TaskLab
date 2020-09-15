const { UserProductsController } = require('../controllers/v1/userProjectsController');
const { authUser } = require('../middlewares/authJwt');
const { authUserProjectAdmin, authUserProjectById, validateUserProject } = require('../middlewares/authUserProjects');
const express = require('express');
const app = express();

// Rutas de user_projects: Version 1
// Peticiones -> post: insertar, delete: eliminar

app.post('/api/v1/user-products', [authUser, authUserProjectAdmin], UserProductsController.post );
app.delete('/api/v1/user-products/:user_id/:project_id', [authUser, validateUserProject, authUserProjectById], UserProductsController.destroy);

module.exports = app;