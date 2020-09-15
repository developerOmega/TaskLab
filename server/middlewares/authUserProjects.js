const UserProject = require('../queries/UserProject');

// Middlewares que validan informacion de routas '/user-projects'


// Middleware que autentica la administracion y relacion del usuario con el input 'project_id' del boby de user-projects
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const authUserProjectAdmin = async (req, res, next) => {
  let body = req.body;

  try {
    let userProject = await UserProject.byIdAdmin(req.user.id, body.project_id);

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

// Middleware que autentica la administracion y relacion del usuario con el project_id(placeholder) de la ruta
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const authUserProjectById = async (req, res, next) => {
  let userId = parseInt(req.params.user_id);
  let projectId = parseInt(req.params.project_id);

  try {
    let userProject = await UserProject.byIdAdmin(req.user.id, projectId);

    if(req.user.id !== userId && !userProject) {
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

// Middleware que valida la existencia de la relacion entre usuarios y proyectos
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const validateUserProject = async (req, res, next) => {
  let userId = req.params.user_id;
  let projectId = req.params.project_id;

  try {
    let userProject = await UserProject.byId(userId, projectId);

    if(!userProject) {
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