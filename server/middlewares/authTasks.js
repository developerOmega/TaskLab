const { db } = require('../../db/db');

const authTaskById = async (req, res, next) => {
  let taskId = req.params.id;
  
  try {
    
    

    let task = await db.query(
      `SELECT * FROM tasks WHERE id=?`, [taskId]
    );
  
    let projectsPerUser = await db.query(
      `SELECT * FROM user_projects WHERE user_id = ? AND project_id = ?`,
      [req.user.id, task[0].project_id]
    );
  
    if( projectsPerUser.length <  1 ) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta tarea"
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

const authTaksAdmin = async (req, res, next) => {
  let body = req.body;

  try {
    
    let projects = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND user_projects.admin=?`, 
      [req.user.id, body.project_id, 1]
    );
    
    if(projects.length < 1) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tiene acceso a esta accion"
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

const authTaksAdminById = async (req, res, next) => {
  let taskId = req.params.id;

  try {
    
    let task = await db.query(`SELECT * FROM tasks WHERE id=?`, [taskId]);
  
    let projects = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND admin=?`,  
      [req.user.id, task[0].project_id, 1]
    );
    
    if(projects.length < 1) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tiene acceso a esta accion"
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


module.exports = { authTaksAdmin, authTaksAdminById, authTaskById };