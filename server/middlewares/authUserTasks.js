const UserProject = require('../queries/UserProject');
const UserTask = require('../queries/UserTask');
const Task = require('../queries/Task');

// Middlewares que validan informacion de routas '/user-tasks'

// Middleware que autentica la administracion y relacion del usuario con el input 'project_id' del boby de user-task
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const authUserTaskAdmin = async (req, res, next) => {
  let body = req.body;

  try {
    let task = await Task.byId(body.task_id);
    let userProject = await UserProject.byIdAdmin(req.user.id, task.project_id);

    if(!userProject) {
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

// Middleware que autentica la administracion y relacion del usuario con el task_id(placeholder) de la ruta
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const authUserTaskAdminById = async (req, res, next) => {
  let userId = parseInt(req.params.user_id);
  let taskId = parseInt(req.params.task_id);

  try {

    let task = await Task.byId(taskId);
    let userProject = await UserProject.byIdAdmin(req.user.id, task.project_id);

    if(!userProject) {
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

// Middleware que valida la relacion entre usuario y task
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const validateUserTask = async (req, res, next) => {
  let userId = req.params.user_id;
  let taskId = req.params.task_id;

  try {
    let userTask = await UserTask.byId(userId, taskId);

    if(!userTask) {
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