const express = require('express');
const app = express();

app.use(require('./users.js'));
app.use(require('./projects.js'));
app.use(require('./messages.js'));
app.use(require('./events.js'));
app.use(require('./tasks.js'));
app.use(require('./user_projects.js'));
app.use(require('./user_tasks.js'));
app.use(require('./userAuth.js'));
app.use(require('./files.js'));

module.exports = app;