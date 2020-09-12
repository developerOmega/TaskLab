const Task = require('../../queries/Task');

class TasksController {
  
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