const Migration = require('./Migration');
const { db } = require('../db');

// Clase que ejecuta la consulta DB para crear tabla pivote 'user_projects'
// Relaciona tabla users y projects
// Agrega columna admin

class CreateTableUserProject extends Migration {

  static async run() {
    await db.query(`
    
      CREATE TABLE IF NOT EXISTS user_projects (
        user_id INT NOT NULL,
        project_id INT NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (user_id, project_id),
        FOREIGN KEY(user_id) REFERENCES users(id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE,
        FOREIGN KEY(project_id) REFERENCES projects(id) 
            ON UPDATE CASCADE
            ON DELETE CASCADE 
      );
    
    `);

    return this.tables('user_projects');
  }

}

module.exports = CreateTableUserProject;