const { db } = require('../../db/db');

const authMessage = async (req, res, next) => {
  let body = req.body;

  try {
    
    let userProject = await db.query(
      `SELECT * FROM user_projects WHERE user_id=? AND project_id=?`, 
      [req.user.id, body.project_id]
    );
  
    if(userProject.length < 1) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este proyecto"
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

const authMessageById = async (req, res, next) => {
  let id = req.params.id;

  try {
    
    let message = await db.query(`SELECT * FROM messages WHERE id=? AND user_id=?`, [id, req.user.id]);
  
    if(message.length < 1) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este proyecto"
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

const validateMessage = async (req, res, next) => {
  let id = req.params.id;

  try {
    let data = await db.query(`SELECT * FROM messages WHERE id = ?`, [id]);

    if ( !data[0] ) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No se encotro el mensaje"
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

module.exports = { authMessage, authMessageById, validateMessage };