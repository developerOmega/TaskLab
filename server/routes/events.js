const { EventsController } = require('../controllers/v1/eventsController');
const { authUser } = require('../middlewares/authJwt');
const { authEventAdmin, authEventAdminById, authEventById, validateEvent } = require('../middlewares/authEvents');
const express = require('express');
const app = express();

// Rutas de eventos: Version 1
// Peticiones -> get: mostrar por id, post: insertar, put: actualizar, delete: eliminar

// app.get('/api/v1/events', EventsController.index );
app.get('/api/v1/events/:id', [authUser, validateEvent, authEventById], EventsController.show );
app.post('/api/v1/events', [authUser, authEventAdmin], EventsController.post );
app.put('/api/v1/events/:id', [authUser, validateEvent, authEventAdminById], EventsController.update );
app.delete('/api/v1/events/:id', [authUser, validateEvent, authEventAdminById], EventsController.destroy );

module.exports = app;