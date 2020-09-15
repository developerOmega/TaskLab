const Migration = require('./Migration');
const { db } = require('../db');


// Clase que ejecuta la consulta DB para crear tabla 'projects'
// Se ejecuta trigger para actualizar columna updated_at

class CreateTableProject extends Migration {

  static async run() {
    await db.query(`
    
      CREATE TYPE status_task AS ENUM ('finish', 'active', 'stop');

      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status status_task,
        user_id INT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    
      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON projects
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();
    
    `);

    return this.tables('projects');
  }

}

module.exports = CreateTableProject;