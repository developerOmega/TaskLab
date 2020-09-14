const { db } = require('../db');

class Migration {

  constructor() {
    this.data = {};
  }

  static async run () {
    return 0;
  }

  static async tables (table) {
    
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
  
  async excuteQuery( name ) {
    
    switch(name) {
      
      case 'create-function-trigger-set-timestamp':
        this.data = await require('./create-function-trigger-set-timestamp').run();
        break;
    
      case 'create-table-users':   
        this.data = await require('./create-table-users').run();
        break;
    
      case 'create-table-projects': 
        this.data = await require('./create-table-projects').run();
        break;
    
      case 'create-table-messages':
        this.data = await require('./create-table-messages').run();
        break;
    
      case 'create-table-events':
        this.data = await require('./create-table-events').run();
        break;
    
      case 'create-table-tasks':
        this.data = await require('./create-table-tasks').run();
        break;
    
      case 'create-table-user-projects':
        this.data = await require('./create-table-user-projects').run();
        break;
    
      case 'create-table-user-tasks':
        this.data = await require('./create-table-user-tasks').run();
        break;
    
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