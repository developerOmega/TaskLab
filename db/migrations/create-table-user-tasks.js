const Migration = require('./Migration');
const { db } = require('../db');

class CreateTableUserTask extends Migration {

  static async run() {
    await db.query(`
    
      CREATE TABLE IF NOT EXISTS user_tasks (
        user_id INT NOT NULL,
        task_id INT NOT NULL,
        PRIMARY KEY (user_id, task_id),
        FOREIGN KEY(user_id) REFERENCES users(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        FOREIGN KEY(task_id) REFERENCES tasks(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
      );
    
    `);

    return this.tables('user_tasks');
  }

}

module.exports = CreateTableUserTask;