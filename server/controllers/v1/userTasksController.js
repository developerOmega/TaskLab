const UserTask = require('../../queries/UserTask');

class UserTasksController {
  static async post (req, res) {
    let body = req.body;

    try {
      let data = await UserTask.create(body);

      return res.status(200).json({
        ok: true,
        data
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
      await UserTask.deleteById(userId, taskId);

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