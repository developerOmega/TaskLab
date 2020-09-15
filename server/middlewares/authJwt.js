const jwt = require('jsonwebtoken');
const { JwtEnv } = require('../../config/config');

// Middlewares que validan informacion del login del usuario

// Middleware que autentica el Token JWT del usuario
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware) 
const authUser = ( req, res, next ) => {
  let token = req.get('Authorization');
  
  jwt.verify(token, JwtEnv.publicKey, JwtEnv.verifyOptions, (err, decode) => {
    if(err){
      return res.status(401).json({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      });
    }
    req.user = decode.user;
    next();
  });
  
}

// Middleware que desautoriza la entrada a rutas
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const unauthUser = ( req, res, next ) => {
  return res.status(401).json({
    ok: false,
    err: {
      message: "Permiso denegado"
    }
  });
}

module.exports = { authUser, unauthUser };
