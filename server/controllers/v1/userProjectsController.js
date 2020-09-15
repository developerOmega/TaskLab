const UserProject = require('../../queries/UserProject');

// Clase que almacena los controladores de ruta '/api/v1/user-projects'
// Controladores: post, destroy

class UserProductsController {

  // Metodo que inserta nuevo registro de la tabla 'user_projects', retorna json con el nuevo registro
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async post (req, res) {
    let body = req.body;

    try {
      let data = await UserProject.create(body);

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

  // Metodo que elimina el registro por id de la tabla 'user_projects', retorna json con mensaje
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async destroy (req, res) {
    let userId = req.params.user_id;
    let projectId = req.params.project_id;

    try {
      await UserProject.deleteById(userId, projectId);

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

module.exports = { UserProductsController };