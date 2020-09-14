const Migration = require('./Migration');
const { db } = require('../db');

class CreateTableEvent extends Migration {

  static async run() {
    await db.query(`
    
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        descrpition TEXT NOT NULL,
        time_init TIMESTAMP NOT NULL DEFAULT NOW(),
        time_end TIMESTAMP NOT NULL DEFAULT NOW(),
        project_id INT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY(project_id) REFERENCES projects(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
      );
      
      ALTER TABLE events RENAME COLUMN descrpition TO description;
      
      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON events
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();

    `);

    return this.tables('events');
  }

}

module.exports = CreateTableEvent;