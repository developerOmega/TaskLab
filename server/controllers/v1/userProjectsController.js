const { db } = require("../../../db/db");

class UserProductsController {
  static async post (req, res) {
    let body = req.body;

    try {
      let query = await db.query(
        `INSERT INTO user_projects (user_id, project_id, admin) VALUES (?,?, ?)`, 
        [ body.user_id, body.project_id, body.admin ]
      )

      let data = await db.query(
        `SELECT * FROM user_projects WHERE user_id = ? AND project_id = ?`, 
        [body.user_id, body.project_id]
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
    let projectId = req.params.project_id;

    try {
      let data = await db.query(
        `DELETE FROM user_projects WHERE user_id=? AND project_id=?`,
        [userId, projectId]
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

module.exports = { UserProductsController };