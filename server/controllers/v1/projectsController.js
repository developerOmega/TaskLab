const Project = require("../../queries/Project");
const UserProject = require('../../queries/UserProject');

// Clase que almacena los controladores de ruta '/api/v1/projects'
// Controladores: index, show, post, update, destroy, showUser, indexUsers, indexEvents, indexMessages, indexTasks 

class ProjectsController {

  // Metodo que retorna json con la paginacion de todos los proyectos
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
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

  // Metodo  que retorna json con un proyecto por id
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
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

  // Metodo que inserta nuevo registro de la tabla 'projects', retorna json con el nuevo registro
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
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

  // Metodo que actualiza registro por id de la tabla 'projects', retorna json con registro actualizado
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
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

  // Metodo que elimina registro por id de la tabla 'projects', retorna json con informacion
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
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


  // Metodo que retorna json con el usuario creador del protecto
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
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

  // Metodo que retorna json con los usuarios pertenecientes a un proyecto
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
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

  // Metodod que retorna json con los mensajes pertenecientes a un proyecto
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
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

  // Metodo que retorna json con los eventos pertenecientes a un proyecto
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
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

  // Metodo  que retorna json con las tareas pertenecientes a un proyecto
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
  static async indexTasks(req, res) {
    let id = req.params.id;

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
}

module.exports = { ProjectsController };