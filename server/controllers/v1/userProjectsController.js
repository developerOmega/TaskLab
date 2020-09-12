const UserProject = require('../../queries/UserProject');

class UserProductsController {
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