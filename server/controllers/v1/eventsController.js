const Event = require('../../queries/Event');

class EventsController {
  
  static async index (req, res) {
    let init = req.query.init;
    let end = req.query.end;

    try {
      let data = await Event.paginate(init, end); 

      if( data.length < 1 ){
        return res.status(404).json({
          ok: false,
          err: {
            message: "No hay eventos"
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

  static async show (req, res) {
    let id = req.params.id;

    try {
      let data = await Event.byId(id);

      return res.status(200).json({
        ok: true,
        data
      })

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
      let data = await Event.create(body);

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      
      return res.sratus(400).json({
        ok: false,
        err
      });

    }
  }

  static async update (req, res) {
    let id = req.params.id;
    let body = req.body;

    try {
      let event = await Event.byId(id);
      let data = await event.update(body);

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
  
  static async destroy (req, res) {
    let id = req.params.id;

    try {
      let data = await Event.byId(id);
      await data.delete();
      
      return res.status(200).json({
        ok: true,
        message: "El evento se ha eliminado con exito"
      });

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }
}

module.exports = { EventsController };