const { MySQL } = require('./connect/mysql');
const { DatabaseEnv } = require('../config/config');

let db = new MySQL( DatabaseEnv.host, DatabaseEnv.user, DatabaseEnv.password, DatabaseEnv.database );

module.exports =  { db } ;