const { EventsController } = require('../controllers/v1/eventsController');
const { authUser } = require('../middlewares/authJwt');
const { authEventAdmin, authEventAdminById, authEventById } = require('../middlewares/authEvents');
const express = require('express');
const app = express();

// app.get('/api/v1/events', EventsController.index );
app.get('/api/v1/events/:id', [authUser, authEventById], EventsController.show );
app.post('/api/v1/events', [authUser, authEventAdmin], EventsController.post );
app.put('/api/v1/events/:id', [authUser, authEventAdminById], EventsController.update );
app.delete('/api/v1/events/:id', [authUser, authEventAdminById], EventsController.destroy );

module.exports = app;