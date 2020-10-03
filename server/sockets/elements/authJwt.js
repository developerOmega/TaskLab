const jwt = require('jsonwebtoken');
const { JwtEnv } = require('../../../config/config');

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
