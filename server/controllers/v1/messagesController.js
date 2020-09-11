const { db } = require("../../../db/db");

class MessagesController {

  static async post(req, res) {
    let body = req.body;

    try {
      let query = await db.query(
        `INSERT INTO messages (content, user_id, project_id) VALUES (?,?,?)`, 
        [body.content, body.user_id, body.project_id]
      );

      let data = await db.query(`SELECT * FROM messages WHERE id = ?`, [query.insertId]);

      return res.status(200).json({
        ok: true,
        data: data[0]
      });
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

  static async update(req, res) {
    let id = req.params.id;
    let body = req.body;

    try {
      let query = await db.query(`UPDATE messages SET ? WHERE id = ?`, [body, id]);
      let data = await db.query(`SELECT * FROM messages WHERE id = ?`, [id]);

      return res.status(200).json({
        ok: true,
        data
      });
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

  static async delete(req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(`DELETE FROM messages WHERE id = ?`, [id]);

      return res.status(200).json({
        ok: true,
        message: "El mensaje se ha eliminado con exito"
      });

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

}

module.exports = { MessagesController };