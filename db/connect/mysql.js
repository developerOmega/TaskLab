const mysql = require('mysql2');

// Clase para ejecutar mysql en proyecto
class MySQL {

  // Contructor recibe los datos host, user, password y database
  constructor(data) {
    this.connection;
    this.host = data.host;
    this.user = data.user;
    this.password = data.password;
    this.database = data.database;

    this.init();
  }

  // Metodo que inicializa base de datos
  init(){
    
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    });

    this.connection;

  }

  // Metodo que retorna la instancia de la db 
  get on() {
    return this.connection;
  }

  // Metodo para agregar queries
  // recibe parametros query:string (consulta) y data:array (datos privados)
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