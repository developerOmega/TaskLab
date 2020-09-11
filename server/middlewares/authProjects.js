const { db } = require('../../db/db');

const authProject = async (req, res, next) => {
  let projectId = req.params.id;
  
  try {
    
    let users = await db.query(
      `SELECT users.id, users.email, user_projects.admin
      FROM projects INNER JOIN user_projects ON projects.id=user_projects.project_id
      INNER JOIN users ON user_projects.user_id=users.id
      WHERE projects.id=?`, [projectId]
    );
    let userFilter = users.filter( user => user.email === req.user.email )[0];
  
    if( !userFilter ) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este proyecto"
        }
      });
    }
  
    next();

  } catch (err) {
    return res.status(500).json({
      ok: false,
      err: {
        name: err.name,
        message: err.message
      }
    });
  }

}

const authProjectAdmin = async (req, res, next) => {
  let projectId = req.params.id;
  
  try {
    
    let user = await db.query(
      `SELECT users.id, user_projects.admin
      FROM projects INNER JOIN user_projects ON projects.id=user_projects.project_id
      INNER JOIN users ON user_projects.user_id=users.id
      WHERE projects.id=? AND users.id=?`, [projectId, req.user.id]
    );
  
    if(user.length < 1 || user[0].admin == false) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta accion"
        }
      });
    }
  
    next();

  } catch (err) {
    return res.status(500).json({
      ok: false,
      err: {
        name: err.name,
        message: err.message
      }
    });
  }
    
}

const validateProject = async (req, res, next) => {
  let id = req.params.id;

  try {
    
    let data = await db.query(`SELECT * FROM projects WHERE id = ?`, [id]);

    if ( !data[0] ) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No se encotro el proyecto"
        },
      });
    }

    next();
    
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err: {
        name: err.name,
        message: err.message
      }
    })
  }
}

const validateProjectsPag = async (req, res, next) => {
  let init = req.query.init;
  let end = req.query.end;

  try {
    let data = init && end ?
    await db.query(`SELECT * FROM projects WHERE id >= ? AND id <= ?`, [init, end]) :
    await db.query(`SELECT * FROM projects`);

    if(data.length < 1) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No existe ningun proyecto"
        }
      });
    }

    next();

  } catch (err) {
    return res.status(500).json({
      ok: true,
      err: {
        name: err.name,
        message: err.message
      }
    });
  }

}

module.exports = { authProjectAdmin, authProject, validateProject, validateProjectsPag };
