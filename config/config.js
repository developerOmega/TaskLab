const fs = require('fs');

// ====================================
// Puerto
// ====================================
const port = process.env.PORT || 3000;

// ====================================
// Entorno
// ====================================
const nodeEnv = process.env.NODE_ENV || 'development';

// ====================================
// Entorno de Dropbox
// ====================================
const dropboxEnv = nodeEnv === 'development' ?  'Dw2AgsFcyFYAAAAAAAAAAZDWXWtrAdyGtmc6M2vsv7hRGpeLPrAp1fk1KKTEavYm' : process.env.DROPBOX;

// ====================================
// JsonWebToken
// ====================================
class JwtEnv {

  static signOptions = {
    issuer:  'Mysoft corp',
    subject:  'some@user.com',
    audience:  'http://mysoftcorp.in',
    expiresIn:  "48h",
    algorithm:  "RS256"
  };

  static verifyOptions = {
    issuer:  'Mysoft corp',
    subject:  'some@user.com',
    audience:  'http://mysoftcorp.in',
    expiresIn:  "48h",
    algorithm:  ["RS256"]
  };

  static publicKey = nodeEnv === 'development' ? fs.readFileSync('server/key/public.key', 'utf8') : process.env.PUBLIC_KEY.replace(/\\n/gm, '\n');
  static privateKey = nodeEnv === 'development' ? fs.readFileSync('server/key/private.key', 'utf8') : process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'); 
}

// ====================================
// Base de datos
// ====================================
class DatabaseEnv {
  static host = nodeEnv === 'development' ? 'localhost' : process.env.HOST;
  static user = nodeEnv === 'development' ? 'root' : process.env.USER;
  static database = nodeEnv === 'development' ? 'task_lab' : process.env.DATABASE;
  static password = nodeEnv === 'development' ? '1234' : process.env.PASSWORD;
}

// class DatabaseEnv {
//   static host = nodeEnv === 'development' ? 'localhost' : process.env.HOST;
//   static user = nodeEnv === 'development' ? 'postgres' : process.env.USER;
//   static database = nodeEnv === 'development' ? 'task_lab' : process.env.DATABASE;
//   static password = nodeEnv === 'development' ? '1234' : process.env.PASSWORD;
//   static port = nodeEnv === 'development' ? '5432' : process.env.PORT;
// }


module.exports = {
  port, nodeEnv, dropboxEnv, JwtEnv, DatabaseEnv
};