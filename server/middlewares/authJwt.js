const jwt = require('jsonwebtoken');
const { JwtEnv } = require('../../config/config');

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

const unauthUser = ( req, res, next ) => {
  return res.status(401).json({
    ok: false,
    err: {
      message: "Permiso denegado"
    }
  });
}

module.exports = { authUser, unauthUser };
