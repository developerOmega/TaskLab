const Task = require('../../queries/Task');

// Clase que almacena los controladores de ruta '/api/v1/tasks'
// Controladores: index, show, post, update, updateStatus, destroy, indexUsers

class TasksController {
  
  // Metodo que retorna json con la paginacion de todas las tareas
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
  static async index (req, res) {
    let init = req.query.init;
    let end = req.query.end;

    try {
      let data = await Task.paginate(init, end);

      if( data.length < 1 ){
        return res.status(404).json({
          ok: false,
          err: {
            message: "No existen tareas"
          }
        })
      }

      return res.status(200).json({
        ok: true,
        data
      });
    } catch (err) {
      
    }
  }

  // Metodo que retorna json de una tarea por id
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async show (req, res) {
    let id = req.params.id;

    try {
      let data = await Task.byId(id);

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

  // Metodo inserta un nuevo registro en la tabla 'tasks', retorna json con el nuevo registro
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async post (req, res) {
    let body = req.body;

    try {
      let data = await Task.create(body);

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

  // Metodo que actualiza un registro por id de la tabla 'tasks', retorna json con el registro actualizado
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
  static async update (req, res){
    let id = req.params.id;
    let body = req.body;

    try {
      let task = await Task.byId(id);
      let data = await task.update(body);

      return res.status(200).json({
        ok: true,
        data
      })
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      });
    }
  }

  // Metodo que actualiza el status del resgistro de la tabla 'tasks', retorna json con el registro actualizado;
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async updateStatus (req, res) {
    let id = req.params.id;
    let body = req.body;

    try {
      let task = await Task.byId(id);
      let data = await task.update({
        status: body.status
      });

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

  // Metodo que elimina registro por id de la tabla 'tasks', retorna json con informacion
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async destroy (req, res) {
    let id = req.params.id;

    try {
      let task = await Task.byId(id);
      await task.delete();
      
      return res.status(200).json({
        ok: true,
        message: "La tarea se ha eliminado con exito"
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

  // Metodo que retorna los usuarios pertenecientes a una tarea
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async indexUsers(req, res) {
    let id = req.params.id;

    try {

      let task = await Task.byId(id);
      let data = await task.users();

      if( data.length < 1 ) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "La tarea no tiene usuarios"
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

module.exports = { TasksController };