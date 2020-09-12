const { MySQL } = require('./connect/mysql');
const { DatabaseEnv } = require('../config/config');
const { PostgreSQL } = require('./connect/postgresql');

// let db = new MySQL({
//   host: DatabaseEnv.host, 
//   user: DatabaseEnv.user, 
//   password: DatabaseEnv.password, 
//   database: DatabaseEnv.database
// });

let db = new PostgreSQL({
  host: DatabaseEnv.host,
  user: DatabaseEnv.user,
  password: DatabaseEnv.password,
  database: DatabaseEnv.database,
  port: DatabaseEnv.port
});

module.exports =  { db } ;