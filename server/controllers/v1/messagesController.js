const Message = require('../../queries/Message');

// Clase que almacena los controladores de ruta '/api/v1/messages'
// Controladores: post, update, destroy

class MessagesController {

  // Metodo que inserta nuevo registro en la tabla 'messages', retorna json con el nuevo registro 
  // Recibe parametros -> req:reqObject (request), res:resObject (response)  
  static async post(req, res) {
    let body = req.body;
    body.user_id = req.user.id;
    
    try {
      let data = await Message.create(body);

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
      });
    }
  }

  // Metodo que actualiza registro por id de la tabla 'messages', retorna json con el regostro actualizado
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async update(req, res) {
    let id = req.params.id;
    let body = req.body;
    delete body.user_id;

    try {
      let message = await Message.byId(id);
      let data = await message.update(body);

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
      });
    }
  }

  // Metodo que elimina el resgtro por id de la tabla 'messages', retorna json con mensaje
  // Recibe parametros -> req:reqObject (request), res:resObject (response)
  static async destroy(req, res) {
    let id = req.params.id;

    try {
      let message = await Message.byId(id);
      await message.delete();

      return res.status(200).json({
        ok: true,
        message: "El mensaje se ha eliminado con exito"
      });

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

}

module.exports = { MessagesController };