const Migration = require('./Migration');
const { db } = require('../db');

// Clase que ejecuta la consulta DB para crear tabla 'users'
// Se ejecuta trigger para actualizat columna updated_at

class CreateTableUser extends Migration {

  static async run () {
    await db.query(`
      
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        img VARCHAR(255) NOT NULL DEFAULT '/images/default.png',
        verify BOOLEAN DEFAULT FALSE,
        active BOOLEAN DEFAULT TRUE,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE(email)
      );

      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();
    
    `);
    
    return this.tables('users');
  }

}

module.exports = CreateTableUser;