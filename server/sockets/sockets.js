const { io } = require( '../server' );
const Message = require('../queries/Message');
const Project = require('../queries/Project');
const authJWT = require('./elements/authJwt');

// Sockets que reciben y mandan informacion de messages

// Metodo inicializa la conexion
io.on('connection', (client) => {
  console.log('Usuario conectado');

  // Metodo que recibe informacion para un nuevo mensaje 
  // Obtiene parametros -> 
  //    data:object{ token:string, message:string, room:number(id de proyecto)  },
  //    callback:function (funcion que se ejecuta con un resultado) 
  client.on('sendMessage', (data, callback) => {

    authJWT( data.token, async (err, user) => {
      if(err) {
        return callback(err);
      }

      try {
        const newMessage = await Message.create({ 
          content: data.message,
          user_id: user.id,
          project_id: data.room
        });
  
        const message = await Message.byIdWithUser(newMessage.id);
        const resp = { ok: true, message };
  
        // Metodo que envia informacion a la sala de chat data.room
        // Envia parametro -> resp:object (infromacion del nuevo mensaje) 
        client.broadcast.to(data.room).emit('sendMessage', resp);
        callback(resp);
  
      } catch (err) {
        callback({
          ok: false,
          err: { message: "El mensaje no se pudo enviar" }
        })
      }
    });

  });

  // Metodo que recibe informacion para renderizar mensajes al inicio de la sala de chat
  // Obtiene parametros -> 
  //    data:object{token:string, projectId:number}
  //    callback:function (funcion que ejecuta con un resultado)
  client.on('renderMessages', async (data, callback) => {
    authJWT( data.token, async (err, user) => {
      if(err) {
        return callback(err);
      }

      try {
        // Metodo que ingresa a sala de chat
        // Envia parametro -> data.projectId:number (nombre de sala)
        client.join(data.projectId);
  
        const project = await Project.byId(data.projectId);
        const messages = await project.messages();
  
        return callback({
          ok: true,
          messages
        });
  
      } catch (err) {
        
        return callback({
          ok: false,
          err: {
            message: "No se pudo encontrar los mensajes"
          }
        });
  
      }

    });
  });

  // Metodo que verifica la desconeccion de un usuario
  client.on('disconnect', () => {
    console.log("El usuario se deconecto");
  })
})  