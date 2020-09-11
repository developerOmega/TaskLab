const { db } = require('../../db/db');

const authUserProjectAdmin = async (req, res, next) => {
  let body = req.body;

  try {


    let userProject = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND admin=?`,
      [req.user.id, body.project_id, 1]
    );

    if(userProject.length < 1) {
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

const authUserProjectById = async (req, res, next) => {
  let userId = parseInt(req.params.user_id);
  let projectId = parseInt(req.params.project_id);

  try {
    let userProject = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND admin=?`,
      [req.user.id, projectId, 1]
    );

    if(req.user.id !== userId && userProject.length < 1) {
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

const validateUserProject = async (req, res, next) => {
  let userId = req.params.user_id;
  let projectId = req.params.project_id;

  try {
    let data = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=?`, 
      [userId, projectId]
    );

    if(!data[0]) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "La relacion no existe"
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

module.exports = { authUserProjectAdmin, authUserProjectById, validateUserProject };