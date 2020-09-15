const UserTask = require('../queries/UserTask');
const Task = require('../queries/Task');
const UserProject = require('../queries/UserProject');

// Middlewares que validan informacion de routas '/tasks'

// Middleware que autentica la relacion del usuario con el proyecto del task
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const authTaskById = async (req, res, next) => {
  let taskId = req.params.id;
  
  try {

    let task = await Task.byId(taskId)
    let projectsPerUser = await UserProject.byId(req.user.id, task.project_id);
  
    if( !projectsPerUser ) {
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

// Middleware que autentica la relacion del usuario administrador con el input 'project_id' del boby del task
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const authTaksAdmin = async (req, res, next) => {
  let body = req.body;

  try {
    let project = await UserProject.byIdAdmin(req.user.id, body.project_id);
    
    if(!project) {
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

// Middleware que autentica la administracion del usuario con el proyecto del task
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const authTaksAdminById = async (req, res, next) => {
  let taskId = req.params.id;

  try {
    
    let task = await Task.byId(taskId)
    let userProject = await UserProject.byIdAdmin(req.user.id, task.project_id);
    
    if(!userProject) {
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

// Middleware que valida relacion entre ususario y task
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const validateUsersByTask = async (req, res, next) => {
  let id = req.params.id;

  try {
    let data = await UserTask.byId(req.user.id, id);

    if(!data) {
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
    })
  }
}

// Middleware que verifica la existencia del task
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const validateTask = async (req, res, next) => {
  let id = req.params.id;

  try {
    let task = await Task.byId(id)
    if ( !task ) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No se encotro el mensaje"
        }
      })
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


module.exports = { authTaksAdmin, authTaksAdminById, authTaskById, validateTask, validateUsersByTask };