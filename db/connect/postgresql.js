const { Client } = require('pg');

class PostgreSQL {

  constructor ( data ) {
    this.connection;
    this.host = data.host;
    this.user = data.user;
    this.password = data.password;
    this.database = data.database;
    this.port = data.port;

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

  query(query = '', data = []) {
    
    return new Promise((resolve, reject) => {

      query = PostgreSQL.statements(query);
      console.log(query);

      this.connection.query( query, data, async (err, results) => {
  
        if(err) {
          reject(err.stack);
        }
        // console.log(results);
  
        resolve(results.rows);
  
      });

    });

  }

  queryPatch(query = '', data = []) {
    return new Promise ((resolve, reject) => {
      let body = data[0];
      
      query = PostgreSQL.statementsPatch(query, body);
      query = PostgreSQL.statements(query);

      let colValues = Object.keys(body).map( (key) => body[key] );
      colValues.push(data[1]);
      console.log(query);

      this.connection.query( query, colValues, async (err, results) => {
  
        if(err) {
          reject(err.stack);
        }
        
        resolve(results.rows);
  
      });

    })   
  }

  static statementsPatch(query, body) {
    let set = [];

    Object.keys(body).forEach( key => set.push(`${key}=?`) );
    
    let queryProto = query.split('data?');
    queryProto.splice(1, 0, set.join(', '));
    
    return queryProto.join('');
  }

  static statements(data) {
    let dataProto = data.split('?');
    
    for(let i = 0; i < dataProto.length - 1; i++) {
      dataProto[i] += `$${i+1}` 
    }

    dataProto = dataProto.join('');

    return dataProto;
  }


}

module.exports = { PostgreSQL };