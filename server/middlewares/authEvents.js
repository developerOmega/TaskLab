const UserProject = require('../queries/UserProject');
const Event = require('../queries/Event');

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