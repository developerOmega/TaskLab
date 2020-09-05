const { Client } = require('pg');

class PostgreSQL {

  constructor ( data ) {
    this.connection;
    this.host = data.host;
    this.user = data.user;
    this.password = data.password;
    this.database = data.database;
    this.port = data.pot;

    this.init();
  }

  init(){
    
    this.connection = new Client({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port
    });
    
    this.connection.connect();

  }

  get on() {
    return this.connection;
  }

  async query(query = '', data = []) {
    
    this.connection.query( query, data, async (err, results) => {

      if(err) {
        return err;
      }

      return results;

    });    
  }

}

module.exports = { MySQL };