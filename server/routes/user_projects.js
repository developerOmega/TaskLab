const { UserProductsController } = require('../controllers/v1/userProjectsController');
const express = require('express');
const app = express();

app.post('/api/v1/user-products', UserProductsController.post );

module.exports = app;