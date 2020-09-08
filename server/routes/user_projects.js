const { UserProductsController } = require('../controllers/v1/userProjectsController');
const { authUser } = require('../middlewares/authJwt');
const express = require('express');
const app = express();

app.post('/api/v1/user-products', [authUser], UserProductsController.post );

module.exports = app;