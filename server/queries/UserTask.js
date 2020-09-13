const Model = require('./Model');
const { db } = require('../../db/db');

class UserTask extends Model {
  constructor(userTask) {
    this.user_id = userTask.user_id;
    this.task_id = userTask.task_id;
  }

  static async create (body) {
    let query = await db.query(
      `INSERT INTO user_tasks (user_id, task_id) VALUES (?,?) RETURNING *`, 
      [ body.user_id, body.task_id ]
    )
    return query[0];
  }

  static async byId (userId, taskId) {
    try {
      let data = await db.query(
        `SELECT * FROM user_tasks WHERE user_id=? AND task_id=?`,
        [ userId, taskId ]
      );

      if(!data[0]) {
        return false;
      }

      let instance = new UserTask(data[0]);
      return instance;

    } catch (err) {
      return err;
    }
  }

  static async deleteById (userId, taskId) {
    try {
      let data = await db.query(
        `DELETE FROM user_tasks WHERE user_id=? AND task_id=?`,
        [userId, taskId]
      );
      return data;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserTask;