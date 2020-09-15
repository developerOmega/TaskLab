const UserProject = require('../queries/UserProject');
const Event = require('../queries/Event');

// Middlewares que validan informacion de routas '/events'

// Middleware que autentica la relacion del usuario con el proyecto del evento
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const authEventById = async (req, res, next) => {
  let eventId = req.params.id;

  try {
    let event = await Event.byId(eventId);
    let projectsPerUser = await UserProject.byId(req.user.id, event.project_id);
  
    if( !projectsPerUser ) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este evento"
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

// Middleware que autentica la relacion del usuario administrador con el input 'project_id' del boby del evento
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const authEventAdmin = async (req, res, next) => {
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

// Middleware que autentica la administracion del usuario con el proyecto del evento
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const authEventAdminById = async (req, res, next) => {
  let eventId = req.params.id;

  try {

    let event = await Event.byId(eventId);
    let userProject = await UserProject.byId(req.user.id, event.project_id);
  
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

// Middleware que verifica la existencia del evento
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const validateEvent = async (req, res, next) => {
  let id = req.params.id;

  try {
    let event = await Event.byId(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No se encotro el evento"
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
    });
  }
}


module.exports = { authEventAdmin, authEventAdminById, authEventById, validateEvent };