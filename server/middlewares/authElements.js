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

const authTask = async (req, res, next) => {
  let taskId = req.params.id;

  try {
    let tasks = await db.query(
      `SELECT users.id, users.email
      FROM tasks INNER JOIN user_tasks ON tasks.id=user_tasks.task_id
      INNER JOIN users ON user_tasks.user_id=user.id
      WHERE tasks.id=?`, [taskId]
    );
  } catch (err) {
    
  }
}

const authUserReq = async (req, res, next) => {
  let userId = parseInt(req.params.id);

  if( req.user.id !== userId ) {
    console.log("Por que?");

    return res.status(403).json({
      ok: false,
      err: {
        message: "No tienes acceso a esta accion"
      }
    });
  }

  next();
}

const authMessage = async (req, res, next) => {
  let id = req.params.id;

  try {
    let message = await db.query(`SELECT * FROM messages WHERE id=? AND user_id=?`, [id, req.user.id]);

    if(message.length < 1) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este proyecto"
        }
      });
    }

    next();

  } catch (err) {
    return res.status(403).json({
      ok: false,
      err: {
        naem: err.name,
        message: err.message
      }
    });
  }
}

module.exports = { 
  authProject, authProjectAdmin, authMessage, authUserReq 
};