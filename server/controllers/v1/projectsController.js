const Project = require("../../queries/Project");
const Task = require('../../queries/Task');
const UserProject = require('../../queries/UserProject');

class ProjectsController {

  static async index (req, res) {
    let init = req.query.init;
    let end = req.query.end;

    try {

      let data = await Project.paginate(init, end);
      
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

  static async show (req, res) {
    let id = req.params.id;

    try {

      let data = await Project.byId(id);

      return res.status(200).json({
        ok: true,
        data: data
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

      let data = await Project.create({
        name: body.name,
        description: body.description,
        status: body.status,
        user_id: req.user.id
      });

      await UserProject.create({
        user_id: req.user.id,
        project_id: data.id,
        admin: 1
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

  static async update (req, res) {
    let id =  req.params.id;
    let body = req.body;
    delete body.user_id;

    try {

      let project = await Project.byId(id);
      let data = await project.update( body );
      
      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      
      return res.status(400).json({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      })

    }
  }

  static async delete (req, res){
    let id = req.params.id;

    try {

      let project = await Project.byId(id);
      await project.delete();

      return res.status(200).json({
        ok: true,
        message: "El proyecto se ha eliminado con exito"
      })

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
  }

  static async showUser (req, res) {
    let id = req.params.id;

    try {

      let project = await Project.byId(id);
      let data = await project.user();

      if( data.length < 1 ){
        return res.status(400).json({
          ok: false,
          err: {
            message: "El usuario no existe"
          }
        })
      }

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

  }

  static async indexUsers (req, res) {
    let id = req.params.id;

    try {
      
      let project = await Project.byId(id);
      let data = await project.users();

      if( data.length < 1 ){
        return res.status(400).json({
          ok: false,
          err: {
            message: "No hay usuarios existentes"
          }
        })
      }

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }

  static async indexMessages (req, res) {
    let id = req.params.id;

    try {

      let project = await Project.byId(id);
      let data = await project.messages();

      if(data.length < 1) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "No hay mensajes"
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
      })
    }
  }

  static async indexEvents(req, res) {
    let id = req.params.id;

    try {

      let project = await Project.byId(id);
      let data = await project.events();

      if(data.length < 1) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "No hay eventos"
          }
        });
      }

      return res.status(200).json({
        ok:true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
  }

  static async indexTasks(req, res) {
    let id = req.params.id;

    if(req.query.time_end){
      await ProjectsController.indexTaskWithTimeEndAndStatus(req, res);
      return;
    }
 
    try {
      let project = await Project.byId(id);
      let data = await project.tasks();

      if(data.length < 1) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay tareas'
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
  
  static async indexTaskWithTimeEndAndStatus ( req, res ) {
    let id = req.params.id;
    let query = req.query;

    try {
      let project = await Project.byId(id);
      let data = await project.taskMTAndStatusTimeEnd(query.time_end);
      const taskWarning = data.filter( task => task.time_end <= new Date() && task.status === 'none' );

      taskWarning.forEach( async task => {
        const reqTask = await Task.byId(task.id);
        await reqTask.update( { status: 'warning' } );
      });

      if(data.length < 1) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay tareas'
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

  static async indexTaskWithTimeEnd ( req, res ) {
    let id = req.params.id;
    let query = req.query;

    try {
      let project = await Project.byId(id);
      let data = await project.taskMoreThanTimeEnd(query.time_end);

      if(data.length < 1) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay tareas'
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

module.exports = { ProjectsController };