const jwt = require('jsonwebtoken');
const { JwtEnv } = require('../../../config/config');


// Metodo que autentica con JWT el mensaje de usuario;
// Recibe parametros -> token:string (token de la secion), callback:function (funcion re se ejecutara cuando se retorne un resultado)
function authJWT( token, callback ) {

  jwt.verify(token, JwtEnv.publicKey, JwtEnv.verifyOptions, (err, decode) => {
    if(err){
      return callback({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      });
    }

    return callback(null, decode.user);

  });

}

module.exports = authJWT;
