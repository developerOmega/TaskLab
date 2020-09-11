const { db } = require('../../db/db');

const authUserById = async (req, res, next) => {
  let userId = parseInt(req.params.id);

  if( req.user.id !== userId ) {

    return res.status(403).json({
      ok: false,
      err: {
        message: "No tienes acceso a esta accion"
      }
    });
  }

  next();
}

const validateUser = async (req, res, next) => {
  let id = req.params.id;

  try {
    let user = await db.query( `SELECT * FROM users WHERE id = ?`, [id] );

    if(!user[0]) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "El registro no existe"
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

const validateUsersPag = async (req, res, next) => {
  let init = req.query.init;
  let end = req.query.end;

  try {
    let data = init && end ? 
    await db.query(`SELECT * FROM users WHERE id >= ? AND id <= ?`, [init, end]) :
    await db.query(`SELECT * FROM users`);

    if(data.length < 1) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "No existe ningun usuario"
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

module.exports = { authUserById, validateUser, validateUsersPag };
