const { Client } = require('pg');

// Clase que ejecuta postgreSQL en el proyecto
class PostgreSQL {

  // Constructor recibe los parametros host, user, password, database y port
  constructor ( data ) {
    this.connection;
    this.host = data.host;
    this.user = data.user;
    this.password = data.password;
    this.database = data.database;
    this.port = data.port;

    this.init();
  }

  // Metodo que inicializa db
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

  // Metodo que retorna retorna instancia db
  get on() {
    return this.connection;
  }

  // Metodo que retorna informacion de query
  // Recibe parametros -> query:string (consulta), data:array (datos privados)
  query(query = '', data = []) {
    
    return new Promise((resolve, reject) => {

      query = PostgreSQL.statements(query);

      this.connection.query( query, data, async (err, results) => {
  
        if(err) {
          reject(err.stack);
        }
  
        resolve(results.rows);
  
      });

    });

  }

  // Metodo que retorna la actualizacion de una tabla
  /* 
    Recibe parametros -> 
      query:string = 'UPDATE table_name SET data? WHERE id=?', 
      data:array[body:object, id:number]
  */ 
  queryPatch(query = '', data = []) {
    return new Promise ((resolve, reject) => {
      let body = data[0];
      
      query = PostgreSQL.statementsPatch(query, body);
      query = PostgreSQL.statements(query);

      let colValues = Object.keys(body).map( (key) => body[key] );
      colValues.push(data[1]);

      this.connection.query( query, colValues, async (err, results) => {
  
        if(err) {
          reject(err.stack);
        }
        
        resolve(results.rows);
  
      });

    })   
  }

  // Metodo que retorna query UPDATE con los datos body
  // Recibe parametros -> query:string (consulta), body:object (datos de actualizacion)
  static statementsPatch(query, body) {
    let set = [];

    Object.keys(body).forEach( key => set.push(`${key}=?`) );
    
    let queryProto = query.split('data?');
    queryProto.splice(1, 0, set.join(', '));
    
    return queryProto.join('');
  }

  // Metodo que retorna query con los placeholdres '?' remplzados a '$1', '$2', ...
  // Recibe parametro -> data:string (query)
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