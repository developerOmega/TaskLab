const { MessagesController } = require('../controllers/v1/messagesController');
const { authUser } = require('../middlewares/authJwt');
const { authMessage, authMessageById } = require('../middlewares/authMessages');
const express = require('express');
const app = express();

// app.get('/api/v1/messages', MessagesController.index );
// app.get('/api/v1/messages/:id', MessagesController.show );
app.post('/api/v1/messages', [authUser, authMessage], MessagesController.post );
app.put('/api/v1/messages/:id', [authUser, authMessageById], MessagesController.update );
app.delete('/api/v1/messages/:id', [authUser, authMessageById], MessagesController.delete );

module.exports = app;