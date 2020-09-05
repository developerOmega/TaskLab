const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const { port } = require('../config/config');
const app = express();

/* body parser */
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use(fileUpload({ useTempFiles: false }) );

// Use this after the variable declaration
app.use(cors());

/* public path */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(require('./routes/users.js'));
app.use(require('./routes/projects.js'));
app.use(require('./routes/messages.js'));
app.use(require('./routes/events.js'));
app.use(require('./routes/tasks.js'));
app.use(require('./routes/user_projects.js'));
app.use(require('./routes/user_tasks.js'));

app.listen(port, () => {
  console.log(`Conectado al puerto ${port}`);
});

