const Migration = require('./Migration');
const { db } = require('../db');


// Clase que ejecuta la consulta DB para crear tabla 'messages'
// Se ejecuta trigger para actualizat columna updated_at

class CreateTableMessages extends Migration {

  static async run() {
    await db.query(`

      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        user_id INT NOT NULL,
        project_id INT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY(user_id) REFERENCES users(id) 
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        FOREIGN KEY(project_id) REFERENCES projects(id) 
            ON UPDATE CASCADE
            ON DELETE CASCADE
      );
      
      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON messages
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();
    
    `);

    return this.tables('messages');
  }

}

module.exports = CreateTableMessages;