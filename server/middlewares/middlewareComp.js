
  const trycatch = (res, callback) => {
    try {

      callback();

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

module.exports = { trycatch };