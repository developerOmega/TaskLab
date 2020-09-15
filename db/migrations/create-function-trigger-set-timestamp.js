const { db } = require('../db');
const Migration = require('./Migration');

// Clase que ejecuta la consulta DB para crear funcion 'trigger_set_timestamp'
// La funcion actualiza la columna updated_at de las tablas 

class CreateFunctionTriggerSetTimestam extends Migration {

  static async run () {
    let query = await db.query(
      `CREATE OR REPLACE FUNCTION trigger_set_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;`
    );
    return query;
  }

}

module.exports = CreateFunctionTriggerSetTimestam;