const { MySQL } = require('./connect/mysql');
const { DatabaseEnv } = require('../config/config');
const { PostgreSQL } = require('./connect/postgresql');

// Instancia para conectar DB MySql con el sistema
// Recibe parametro -> type object (datos de coneccion de objecto DatabaseEnv) 
// let db = new MySQL({
//   host: DatabaseEnv.host, 
//   user: DatabaseEnv.user, 
//   password: DatabaseEnv.password, 
//   database: DatabaseEnv.database
// });

// Instancia para conectar DB postgreSQL con el sistema
// Recibe parametro -> type object (datos de coneccion de objecto DatabaseEnv) 
let db = new PostgreSQL({
  host: DatabaseEnv.host,
  user: DatabaseEnv.user,
  password: DatabaseEnv.password,
  database: DatabaseEnv.database,
  port: DatabaseEnv.port
});

module.exports =  { db } ;