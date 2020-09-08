const component = require('../middlewares/middlewareComp');
const { db } = require('../../db/db');

const authEventById = async (req, res, next) => {
  let eventId = req.params.id;
  
  component.trycatch( res, async () => {

    let event = await db.query(
      `SELECT * FROM events WHERE id=?`, [eventId]
    );

    if( event.length <  1 ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El evento no existe"
        }
      });
    }
  
    let projectsPerUser = await db.query(
      `SELECT * FROM user_projects WHERE user_id = ? AND project_id = ?`,
      [req.user.id, event[0].project_id]
    );
  
    if( projectsPerUser.length <  1 ) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta tarea"
        }
      });
    }
    next();
  });

}

const authEventAdmin = async (req, res, next) => {
  let body = req.body;

  component.trycatch(res, async () => {

    let projects = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND admin=?`, 
      [req.user.id, body.project_id, 1]
    );
    
    if(projects.length < 1) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tiene acceso a esta accion"
        }
      });
    }
    next();
  });
}

const authEventAdminById = async (req, res, next) => {
  let eventId = req.params.id;

  component.trycatch(res, async () => {

    let event = await db.query(`SELECT * FROM events WHERE id=?`, [eventId]);
  
    let projects = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND admin=?`, 
      [req.user.id, event[0].project_id, 1]
    );

    if(projects.length < 1) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tiene acceso a esta accion"
        }
      });
    }

    next();

  });
}


module.exports = { authEventAdmin, authEventAdminById, authEventById };