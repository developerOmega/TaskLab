const { db } = require('../db');

//Clase padre de las migraciones

class Migration {

  // Inicializa propiedad data:object
  constructor() {
    this.data = {};
  }

  // Metodo que retorna los queries de las clases hijas 
  static async run () {
    return 0;
  }

  // Metodo que retorna infromacion de las tablas DB
  // Recibe parametro -> table:string (nombre de tabla) 
  static async tables (table) {
    
    // Si es parametro table es igual a 'all' entonces retornara todas las tablas DB
    if(table === 'all' || !table) {
      return await db.query(
        ` select * from pg_catalog.pg_tables where schemaname != ? and schemaname != ?; `, 
        ['information_schema', 'pg_catalog']
      );
    }
    
    return await db.query(
      ` select * from pg_catalog.pg_tables where schemaname != ? and schemaname != ? and tablename = ?; `, 
      ['information_schema', 'pg_catalog', table]
    );
  }
  
  // Metodo asincrono que retorna las migraciones
  // Recibe parametro -> name:string (nombre de case en switsh)
  /*
    REVIEW EN TERMINAL
    $ node db/migrations/index.js --query name_case
    
  */
  async excuteQuery( name ) {
    
    switch(name) {
      
      // Crea funcion trigger-set-timestamp
      case 'create-function-trigger-set-timestamp':
        this.data = await require('./create-function-trigger-set-timestamp').run();
        break;
    
      // Crea tabla users
      case 'create-table-users':   
        this.data = await require('./create-table-users').run();
        break;
    
      // Crea tabla projects
      case 'create-table-projects': 
        this.data = await require('./create-table-projects').run();
        break;
    
      // Crea tabla messages
      case 'create-table-messages':
        this.data = await require('./create-table-messages').run();
        break;
    
      // Crea tabla events
      case 'create-table-events':
        this.data = await require('./create-table-events').run();
        break;
    
      // Crea tabla tasks
      case 'create-table-tasks':
        this.data = await require('./create-table-tasks').run();
        break;
    
      // Crea tabla user_projects
      case 'create-table-user-projects':
        this.data = await require('./create-table-user-projects').run();
        break;
    
      // Crea tabla user_tasks
      case 'create-table-user-tasks':
        this.data = await require('./create-table-user-tasks').run();
        break;
    
      // Ejecuta todas las migraciones
      case 'all':
        this.data = await require('./execute-all').run();
        break;
    
      default:
        return console.log("No se encontro el query");
    }

    return this.data;
  }

}

module.exports = Migration;