const { db } = require('../../db/db');

const authUserTaskAdmin = async (req, res, next) => {
  let body = req.body;

  try {

    let task = await db.query( `SELECT * FROM tasks WHERE id=?`, [body.task_id] );

    if(task.length < 1) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No existe la terea"
        }
      });
    }

    let userProject = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND admin=?`,
      [req.user.id, task[0].project_id, 1]
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

const authUserTaskAdminById = async (req, res, next) => {
  let userId = parseInt(req.params.user_id);
  let taskId = parseInt(req.params.task_id);

  try {

    let task = await db.query( `SELECT * FROM tasks WHERE id=?`, [taskId] );

    let userProject = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND admin=?`,
      [req.user.id, task[0].project_id, 1]
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

const validateUserTask = async (req, res, next) => {
  let userId = req.params.user_id;
  let taskId = req.params.task_id;

  try {
    let data = await db.query(
      `SELECT * FROM user_tasks WHERE user_id=? AND task_id=?`,
      [userId, taskId]
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

module.exports = { authUserTaskAdmin, authUserTaskAdminById, validateUserTask };