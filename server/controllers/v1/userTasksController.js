const { db } = require("../../../db/db");

class UserTasksController {
  static async post (req, res) {
    let body = req.body;

    try {
      let query = await db.query(
        `INSERT INTO user_tasks (user_id, task_id) VALUES (?,?)`, 
        [ body.user_id, body.task_id ]
      )

      let data = await db.query(
        `SELECT * FROM user_tasks WHERE user_id = ? AND task_id = ?`, 
        [body.user_id, body.task_id]
      );

      return res.status(200).json({
        ok: true,
        data: data[0]
      });
      
    } catch (err) {
      return res.status(400).json({
        ok: true,
        err
      });
    }
  }

  static async destroy (req, res) {
    let userId = req.params.user_id;
    let taskId = req.params.task_id;

    try {
      let data = await db.query(
        `DELETE FROM user_tasks WHERE user_id=? AND task_id=?`,
        [userId, taskId]
      );

      return res.status(200).json({
        ok: true,
        message: "La relacion se elimino con exito"
      });

    } catch (err) {
      return res.status(400).json({
        ok: true,
        err
      });
    }
  }
}

module.exports = { UserTasksController };