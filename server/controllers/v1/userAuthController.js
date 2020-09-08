const { db } = require('../../../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JwtEnv } = require('../../../config/config');

class UserAuthController {
  
  static async login ( req, res ) {
    let body = req.body;

    try {
      let user = await db.query(`SELECT * FROM users WHERE email=?`, [body.email]);
      
      console.log(user[0]);

      if(!user[0]) {
        return res.status(401).json({
          ok: false,
          err: {
            message: "El (email) y contraseña son incorrectos"
          }
        });
      }

      if( !bcrypt.compareSync(body.password, user[0].password ) ) {
        return res.status(401).json({
          ok: false,
          err: {
            message: "El email y (contraseña) son incorrectos"
          }
        });
      }

      let token = jwt.sign({ user: user[0] }, JwtEnv.privateKey, JwtEnv.signOptions );

      return res.status(200).json({
        ok: true,
        user: user[0],
        token
      });
      
    } catch (err) {

      return res.status(500).json({
        ok: false,
        err
      });
    }
  }

  static async logout (req, res) {

  }

}

module.exports = { UserAuthController };