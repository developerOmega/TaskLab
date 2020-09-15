const Project = require('../queries/Project');
const UserProject = require('../queries/UserProject');

// Middlewares que validan informacion de routas '/projects'

// Middleware que autentica la relacion del usuario y el proyecto
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const authProject = async (req, res, next) => {
  let projectId = req.params.id;
  
  try {
    
    let userProject = await UserProject.byId(req.user.id, projectId);
  
    if( !userProject ) {
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

// Middleware que autentica la administracion del usuario en le proyecto
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const authProjectAdmin = async (req, res, next) => {
  let projectId = req.params.id;
  
  try {

    let userProject = await UserProject.byIdAdmin(req.user.id, projectId);

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

// Middleware que verifica la existencia del proyecto
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const validateProject = async (req, res, next) => {
  let id = req.params.id;

  try {
    
    let data = await Project.byId(id);

    if ( !data ) {
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

// Middleware que valida la existencia de registros en la paginacion del proyecto
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const validateProjectsPag = async (req, res, next) => {
  let init = req.query.init;
  let end = req.query.end;

  try {

    let data = await Project.paginate(init, end);

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
