const { db } = require('../../db/db');

const authEventById = async (req, res, next) => {
  let eventId = req.params.id;

  try {
    let event = await db.query(
      `SELECT * FROM events WHERE id=?`, [eventId]
    );
  
    let projectsPerUser = await db.query(
      `SELECT * FROM user_projects WHERE user_id = ? AND project_id = ?`,
      [req.user.id, event[0].project_id]
    );
  
    if( projectsPerUser.length <  1 ) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este evento"
        }
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err: {
        name: err.name,
        message: err.message
      }
    })
  }

}

const authEventAdmin = async (req, res, next) => {
  let body = req.body;

  try {
    
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

const authEventAdminById = async (req, res, next) => {
  let eventId = req.params.id;

  try {
    
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

const validateEvent = async (req, res, next) => {
  let id = req.params.id;

  try {
    let data = await db.query(`SELECT * FROM events WHERE id = ?`, [id]);

    if ( !data[0] ) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No se encotro el evento"
        },
      });
    }

    next();
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


module.exports = { authEventAdmin, authEventAdminById, authEventById, validateEvent };