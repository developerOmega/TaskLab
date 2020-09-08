const { MessagesController } = require('../controllers/v1/messagesController');
const { authUser } = require('../middlewares/authJwt');
const { authMessage } = require('../middlewares/authElements');
const express = require('express');
const app = express();

// app.get('/api/v1/messages', MessagesController.index );
// app.get('/api/v1/messages/:id', MessagesController.show );
app.post('/api/v1/messages', authUser, MessagesController.post );
app.put('/api/v1/messages/:id', [authUser, authMessage], MessagesController.update );
app.delete('/api/v1/messages/:id', [authUser, authMessage], MessagesController.delete );


module.exports = app;