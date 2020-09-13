const UserProject = require('../queries/UserProject');
const Message = require('../queries/Message');

const authMessage = async (req, res, next) => {
  let body = req.body;

  try {

    let userProject = await UserProject.byId(req.user.id, body.project_id);
  
    if(!userProject) {
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

const authMessageById = async (req, res, next) => {
  let id = req.params.id;

  try {
    
    let message = await Message.byId(id);
    let userProject = await UserProject.byId(req.user.id, message.project_id);

    if(!userProject) {
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
    })
  }

}

const validateMessage = async (req, res, next) => {
  let id = req.params.id;

  try {
    let message = await Message.byId(id);

    if ( !message ) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No se encotro el mensaje"
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

module.exports = { authMessage, authMessageById, validateMessage };