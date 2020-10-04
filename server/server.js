const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

const socketIO = require('socket.io');
const http = require('http');

const { port } = require('../config/config');

const app = express();
let server = http.createServer(app);

/* body parser */
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use(fileUpload({ useTempFiles: false }) );

// Use this after the variable declaration
app.use(cors());

/* public path */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Project routes
app.use(require('./routes/index.js'));

// Sockets
module.exports.io = socketIO(server);
require('./sockets/sockets');

server.listen(port, () => {
  console.log(`Conectado al puerto ${port}`);
});

