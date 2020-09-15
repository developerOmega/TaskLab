const User = require('../../queries/User');
const bcrypt = require('bcrypt');

// Clase que almacena los controladores de ruta '/api/v1/users'
// Controladores: index, show, post, update, destroy, indexProjects

class UsersController {

  // Metodo que retorna json con la paginacion de todos los usuarios 
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
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

  // Metodo que retorna json con un usuario por id
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
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

  // Metodo que inserta nuevo registro de la tabla 'users', retorna json con nuevo registro
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async post(req, res) {
    let body = req.body;

    try {
      
      let data = await User.create({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        verify: body.verify
      });

      res.status(200).json({
        ok: true,
        data
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

  // Metodo que actualiza registro por id de la tabla 'users', retorna json con registro actualizado
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
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

  // Metodo que elimina registro por id de tabla 'users', retorna json con mensaje
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
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

  // Metodo que retorna json con los proyectos de un usuario
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
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