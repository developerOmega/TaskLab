const { MessagesController } = require('../controllers/v1/messagesController');
const express = require('express');
const app = express();

app.get('/api/v1/messages', MessagesController.index );
app.get('/api/v1/messages/:id', MessagesController.show );
app.post('/api/v1/messages', MessagesController.post );
app.put('/api/v1/messages/:id', MessagesController.update );
app.delete('/api/v1/messages/:id', MessagesController.delete );


module.exports = app;