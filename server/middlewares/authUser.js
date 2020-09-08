const { db } = require('../../db/db');

const authUserReq = async (req, res, next) => {
  let userId = parseInt(req.params.id);

  if( req.user.id !== userId ) {
    console.log("Por que?");

    return res.status(403).json({
      ok: false,
      err: {
        message: "No tienes acceso a esta accion"
      }
    });
  }

  next();
}


module.exports = { authUserReq };