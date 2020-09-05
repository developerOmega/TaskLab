const { EventsController } = require('../controllers/v1/eventsController');
const express = require('express');
const app = express();

app.get('/api/v1/events', EventsController.index );
app.get('/api/v1/events/:id', EventsController.show );
app.post('/api/v1/events', EventsController.post );
app.put('/api/v1/events/:id', EventsController.update );
app.delete('/api/v1/events/:id', EventsController.destroy );

module.exports = app;