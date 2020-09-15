const Migration = require('./Migration');
const { db } = require('../db');

// Clase que ejecuta la consulta DB para crear tabla 'tasks'
// Se ejecuta trigger para actualizar columna updated_at

class CreateTableTask extends Migration {

  static async run() {
    await db.query(`
    
      CREATE TYPE status_project AS ENUM ('none', 'fine', 'error', 'warning');

      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        status status_project,
        time_init TIMESTAMP NOT NULL DEFAULT NOW(),
        time_end TIMESTAMP NOT NULL DEFAULT NOW(),
        project_id INT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY(project_id) REFERENCES projects(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
      );

      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON tasks
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();
    
    `);

    return this.tables('tasks');
  }

}

module.exports = CreateTableTask;