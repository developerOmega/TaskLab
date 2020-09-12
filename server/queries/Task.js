const Model = require('./Model');
const {db} = require('../../db/db');

class Task extends Model {
  constructor(task) {
    super(task);
    this.description = task.description;
    this.status = task.status;
    this.time_init = task.task_init;
    this.time_end = task.task_end;
    this.project_id = task.project_id;
  }

  static async all () {
    let data = await db.query(`SELECT * FROM tasks`);
    return data;
  }

  static async paginate (init = 0, end = 0) {
    let data = init != 0 && end != 0 ? 
      await db.query(`SELECT * FROM tasks WHERE id >= ? AND id <= ?`, [inti, end]) :
      await db.query(`SELECT * FROM tasks`);
    return data;
  }

  static async byId(id) {
    try {
      let data = await db.query(`SELECT * FROM tasks WHERE id=?`, [id]);
      if(!data[0]){
        return false;
      }
      let instance = new Task(data[0]);
      return instance;
    } catch (err) {
      return err;
    }
  }

  static async create(body) {
    let query = await db.query(
      `INSERT INTO tasks (description, status, time_init, time_end, project_id) VALUES (?,?,?,?, ?)`,
      [body.description, body.status, body.time_init, body.time_end, body.project_id]
    );

    let data = await db.query(`SELECT * FROM tasks WHERE id = ?`, [query.insertId])
    return data[0];
  }

  async update(body) {
    let query =  await db.query(`UPDATE tasks SET ? WHERE id = ?`, [body, this.id]);
    let data = await db.query( `SELECT * FROM tasks WHERE id = ?`, [this.id]);
    return data[0];
  }

  async delete() {
    let data = await db.query( `DELETE FROM tasks WHERE id = ?`, [this.id]);
    return data;
  }

  async users() {
    let data = await db.query(
      `SELECT users.id, users.name, users.img, users.email, users.verify, users.active, users.updated_at, users.created_at
      FROM tasks INNER JOIN user_tasks ON tasks.id=user_tasks.task_id
      INNER JOIN users ON user_tasks.user_id=users.id
      WHERE tasks.id=?;`,
      [this.id]
    );
    return data;
  }

}

module.exports = Task;