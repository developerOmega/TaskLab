const User = require('../queries/User');

// Middlewares que validan informacion de routas '/users'

// Middleware que autentica usuario con el id(placeholder) del usuario de la ruta
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const authUserById = async (req, res, next) => {
  let userId = parseInt(req.params.id);

  if( req.user.id !== userId ) {

    return res.status(403).json({
      ok: false,
      err: {
        message: "No tienes acceso a esta accion"
      }
    });
  }

  next();
}

// Middleware que valida le existencia del usuario
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const validateUser = async (req, res, next) => {
  let id = req.params.id;

  try {
    let user = await User.byId(id);

    if(!user) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "El registro no existe"
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

// Middleware que valida la existencia de usuarios en una paginacion
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const validateUsersPag = async (req, res, next) => {
  let init = req.query.init;
  let end = req.query.end;

  try {
    let users = await User.paginate(init, end);

    if(users.length < 1) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No existe ningun usuario"
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

module.exports = { authUserById, validateUser, validateUsersPag };
