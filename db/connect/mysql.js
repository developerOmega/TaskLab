const mysql = require('mysql2');

class MySQL {

  constructor(data) {
    this.connection;
    this.host = data.host;
    this.user = data.user;
    this.password = data.password;
    this.database = data.database;

    this.init();
  }

  init(){
    
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    });

    this.connection;

  }

  get on() {
    return this.connection;
  }

  query(query = '', data = []) {
    
    return new Promise((resolve, reject) => {
      
      this.connection.query( query, data, async (err, results) => {

        if(err) {
          reject(err);
        }
        else {
          resolve(results);
        }
  
      });

    })
    
  }

}

module.exports = { MySQL };