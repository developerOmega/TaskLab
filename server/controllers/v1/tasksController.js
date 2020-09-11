const { db } = require("../../../db/db");

class TasksController {
  
  static async index (req, res) {
    let init = req.query.init;
    let end = req.query.end;

    try {
      let data = init && end ? 
        await db.query(`SELECT * FROM tasks WHERE id >= ? AND id <= ?`, [inti, end]) :
        await db.query(`SELECT * FROM tasks`);


      if( data.length < 1 ){
        return res.status(404).json({
          ok: false,
          err: {
            message: "No existen tareas"
          }
        })
      }

      return res.status(200).json({
        ok: true,
        data
      });
    } catch (err) {
      
    }
  }

  static async show (req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(`SELECT * FROM tasks WHERE id = ?`, [id]);

      return res.status(200).json({
        ok: true, 
        data: data[0]
      });

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
        `INSERT INTO tasks (description, status, time_init, time_end, project_id) VALUES (?,?,?,?, ?)`,
        [body.description, body.status, body.time_init, body.time_end, body.project_id]
      );

      let data = await db.query(`SELECT * FROM tasks WHERE id = ?`, [query.insertId])

      return res.status(200).json({
        ok: true,
        data: data[0]
      });

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
  }

  static async update (req, res){
    let id = req.params.id;
    let body = req.body;

    try {
      let query =  await db.query(`UPDATE tasks SET ? WHERE id = ?`, [body, id]);
      let data = await db.query( `SELECT * FROM tasks WHERE id = ?`, [id]);

      return res.status(200).json({
        ok: true,
        data: data[0]
      })
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

  static async destroy (req, res) {
    let id = req.params.id;

    try {
      let data = await db.query( `DELETE FROM tasks WHERE id = ?`, [id]);

      return res.status(200).json({
        ok: true,
        message: "La tarea se ha eliminado con exito"
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
  }

  static async indexUsers(req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(
        `SELECT users.id, users.name, users.img, users.email
        FROM tasks INNER JOIN user_tasks ON tasks.id=user_tasks.task_id
        INNER JOIN users ON user_tasks.user_id=users.id
        WHERE tasks.id=?;`,
        [id]
      );

      if( data.length < 1 ) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "La tarea no tiene usuarios"
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
}

module.exports = { TasksController };