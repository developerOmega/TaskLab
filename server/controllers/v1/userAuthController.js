const User = require('../../queries/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JwtEnv } = require('../../../config/config');

class UserAuthController {
  
  static async login ( req, res ) {
    let body = req.body;

    try {
      let user = await User.byEmail(body.email);

      if(!user) {
        return res.status(401).json({
          ok: false,
          err: {
            message: "El (email) y contraseña son incorrectos"
          }
        });
      }

      if( !bcrypt.compareSync(body.password, user.password ) ) {
        return res.status(401).json({
          ok: false,
          err: {
            message: "El email y (contraseña) son incorrectos"
          }
        });
      }

      let token = jwt.sign({ user }, JwtEnv.privateKey, JwtEnv.signOptions );

      return res.status(200).json({
        ok: true,
        user,
        token
      });
      
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

  static async logout (req, res) {

  }

}

module.exports = { UserAuthController };