const { db } = require("../../../db/db");

class ProjectsController {

  static async index (req, res) {
    let init = req.query.init;
    let end = req.query.end;

    try {
      
      let data = init && end ?
        await db.query(`SELECT * FROM projects WHERE id >= ? AND id <= ?`, [init, end]) :
        await db.query(`SELECT * FROM projects`);

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

      let data = await db.query(`SELECT * FROM projects WHERE id = ?`, [id]);

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
        `INSERT INTO projects (name, description, status, user_id) VALUES (?,?,?,?)`,
        [body.name, body.description, body.status, body.user_id]
      );
      
      let queryUserProject = await db.query(
        `INSERT INTO user_projects (user_id, project_id, admin) VALUES (?,?,?)`,
        [ req.user.id, query.insertId, 1 ]
      )
      
      let data = await db.query(`SELECT * FROM projects WHERE id = ?`, [query.insertId]);
      
      
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

  static async update (req, res) {
    let id =  req.params.id;
    let body = req.body;

    try {
      let query = await db.query(`UPDATE projects SET ? WHERE id =  ?`, [body, id]);
      let data = await db.query(`SELECT * FROM projects WHERE id = ?`, [id]);
      
      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      
      return res.status(400).json({
        ok: false,
        err
      })

    }
  }

  static async delete (req, res){
    let id = req.params.id;

    try {
      let data = await db.query(`DELETE FROM projects WHERE id = ?`, [id]);

      return res.status(200).json({
        ok: true,
        message: "El proyecto se ha eliminado con exito"
      })

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
  }

  static async showUser (req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(
        `SELECT users.id, users.name, users.email, users.img, users.verify, users.active, users.updated_at, users.created_at
        FROM projects INNER JOIN users ON projects.user_id=users.id
        WHERE projects.id= ?`, [id]
      );

      if( data.length < 1 ){
        return res.status(400).json({
          ok: false,
          err: {
            message: "El usuario no existe"
          }
        })
      }

      return res.status(200).json({
        ok: true,
        data: data[0]
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

  }

  static async indexUsers (req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(
        `SELECT users.id, users.name, users.email, users.img, users.verify, users.active, user_projects.admin, users.updated_at, users.created_at
        FROM projects INNER JOIN user_projects ON projects.id=user_projects.project_id
        INNER JOIN users ON user_projects.user_id=users.id
        WHERE projects.id = ?`, [id]
      );

      if( data.length < 1 ){
        return res.status(400).json({
          ok: false,
          err: {
            message: "No hay usuarios existentes"
          }
        })
      }

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }

  static async indexMessages (req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(
        `SELECT messages.id, messages.content, users.name, users.email, messages.updated_at, messages.created_at 
        FROM messages INNER JOIN users ON messages.user_id=users.id
        INNER JOIN projects ON messages.project_id=projects.id
        WHERE projects.id = ?`, [id]
      )

      if(data.length < 1) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "No hay mensajes"
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
      })
    }
  }

  static async indexEvents(req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(
        `SELECT events.id, events.name, events.description, events.time_init, events.time_end, events.updated_at, events.created_at
        FROM events INNER JOIN projects ON events.project_id=projects.id
        WHERE projects.id=?`, [id]
      );

      if(data.length < 1) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "No hay eventos"
          }
        });
      }

      return res.status(200).json({
        ok:true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
  }

  static async indexTasks(req, res) {
    let id = req.params.id;

    try {
      let data = await db.query( `SELECT * FROM tasks WHERE project_id=?`, [id] );

      if(data.length < 1) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay tareas'
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

module.exports = { ProjectsController };