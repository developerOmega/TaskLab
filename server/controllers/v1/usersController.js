const User = require('../../queries/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JwtEnv } = require('../../../config/config');

class UsersController {

  static async search (req, res) {
    let search = req.params.search;
    console.log(search);
    
    try {
      let data = await User.search(search);
      return res.status(200).json({
        ok: true,
        data
      })
      
    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }

  static async index (req, res) {
    let init = req.query.init;
    let end = req.query.end;

    try {
      let data = await User.paginate(init, end);
        
      return res.status(200).json({
        ok: true,
        data
      });

    } 
    catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });

    }

  }

  static async show(req, res) {
    let id = req.params.id;

    try{
      let data = await User.byId(id);

      return res.status(200).json({
        ok: true,
        data
      });

    } catch(err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }

  static async post(req, res) {
    let body = req.body;

    if(body.repeat_password != body.password) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "Las contraseñas no coincidien"
        }
      });
    }

    try {
      
      let data = await User.create({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        verify: body.verify
      });

      let user = await User.byEmail(body.email);
      let token = jwt.sign({ user }, JwtEnv.privateKey, JwtEnv.signOptions );

      res.status(200).json({
        ok: true,
        data,
        token
      });

    } catch (err) {
      res.status(400).json({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      })
    }
  }

  static async update(req, res) {
    let body = req.body;
    let id = req.params.id;
    delete body.password;

    try {
      let user = await User.byId(id);
      let data = await user.update(body);

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      
      return res.status(400).json({
        ok: false,
        err
      });

    }

  }

  static async updatePassword (req, res) {
    let body = req.body;
    let id = req.params.id;
    let user = await User.byId(id);

    if ( !bcrypt.compareSync(body.old_password, user.password) ) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Password incorrecto"
        }
      })
    }

    try {
      let data = await user.update({ password: bcrypt.hashSync(body.new_password, 10) });
      
      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
  }

  static async destroy(req, res) {
    let id = req.params.id;

    try {
      let user = await User.byId(id);
      await user.delete();

      return res.status(200).json({
        ok: true,
        message: "El usuario se ha eliminado con exito"
      });

    } catch (err) {

      return res.status(400).json({
        ok: false,
        err
      });

    }
  }

  static async inactive ( req, res ) {
    let id = req.params.id;

    try{
      let user = await User.byId(id);
      let data = await user.update( { active: false } );

      return res.status(200).json({
        ok: true,
        data,
        message: "El usuario se ha eliminado con exito"
      });
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

  static async indexProjects(req, res) {
    let id = req.params.id;

    try {
      let user = await User.byId(id);
      let data = await user.projects();

      if(data.length < 1) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "El ususario no tiene proyectos"
          }
        });
      }

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

  }
}

module.exports = { UsersController };