const { io } = require( '../server' );
const Message = require('../queries/Message');
const Project = require('../queries/Project');
const authJWT = require('./elements/authJwt');

io.on('connection', (client) => {
  console.log('Usuario conectado');

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

  client.on('renderMessages', async (data, callback) => {
    authJWT( data.token, async (err, user) => {
      if(err) {
        return callback(err);
      }

      try {
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

  client.on('disconnect', () => {
    console.log("El usuario se deconecto");
  })
})  