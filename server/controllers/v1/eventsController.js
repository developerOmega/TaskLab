const { db } = require("../../../db/db");

class EventsController {
  
  static async index (req, res) {
    let init = req.query.init;
    let end = req.query.end;

    try {
      
      let data = init && end ? 
        await db.query(`SELECT * FROM events WHERE id >= ? AND id <= ?`, [init, end]) :
        await db.query(`SELECT * FROM events`);


      if( data.length < 1 ){
        return res.status(404).json({
          ok: false,
          err: {
            message: "No hay eventos"
          }
        });
      }

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
  }

  static async show (req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(`SELECT * FROM events WHERE id = ?`, [id]);

      return res.staus(200).json({
        ok: true,
        data: data[0]
      })

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
  }

  static async post (req, res) {
    let body = req.body;

    try {
      let query = await db.query(
        `INSERT INTO events (name, description, time_init, time_end, project_id) VALUES (?,?,?,?, ?)`,
        [body.name, body.description, body.time_init, body.time_end, body.project_id]
      )

      let data = await db.query(`SELECT * FROM events WHERE id = ?`, [query.insertId]);

      return res.status(200).json({
        ok: true,
        data: data[0]
      });

    } catch (err) {
      
      return res.sratus(400).json({
        ok: false,
        err
      });

    }
  }

  static async update (req, res) {
    let id = req.params.id;
    let body = req.body;

    try {
      let query = await db.query(`UPDATE events SET ? WHERE ?`, [body, id]);
      let data = await db.query(`SELECT * FROM events WHERE id = ?`, [id]);

      return res.status(200).json({
        ok: true,
        data: data[0]
      });

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      });
    }
  }
  
  static async destroy (req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(`DELETE FROM events WHERE id = ?`, [id]);
      
      return res.status(200).json({
        ok: true,
        message: "El evento se ha eliminado con exito"
      });

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }
}

module.exports = { EventsController };