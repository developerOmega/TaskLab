const UserTask = require('../../queries/UserTask');

// Clase que almacena los controladores de ruta '/api/v1/user-tasks'
// Controladores: post, destroy

class UserTasksController {

  // Metodo que inserta nuevo registro de la tabla 'user_tasks', retorna json con el nuevo registro
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
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

  // Metodo que elimina el registro por id de la tabla 'user_tasks', retorna json con mensaje
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
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