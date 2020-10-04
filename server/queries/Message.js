const Model = require('./Model');
const {db} = require('../../db/db');

// Clase que administra los queries de la tabla 'messages'

class Message extends Model {
  // Constructor que inicialzia propiedades: content, user_id y project_id
  constructor(message) {
    super(message);
    this.content = message.content;
    this.user_id = message.user_id;
    this.project_id = message.project_id;
  }

  // Metodo que retorna todos los mensajes
  static async all () {
    let data = await db.query(`SELECT * FROM messages`);
    return data;
  }

  // Metodo que retorna mensajes por id
  // Recibe parametro -> id:number (id del mensaje)
  static async byId(id) {
    try {
      let data = await db.query(`SELECT * FROM messages WHERE id=?`, [id]);

      if(!data[0]){
        return false;
      }

      let instance = new Message(data[0]);
      return instance;
    } catch (err) {
      return err;
    }
  }

  // Metodo que retorna mensajes junto con el usuario
  // Recebe aprametros -> id:number (id del message)
  static async byIdWithUser(id) {
    try {
      let data = await db.query(
        `SELECT messages.id, messages.content, users.name, users.email, users.img, messages.updated_at, messages.created_at 
        FROM messages INNER JOIN users ON messages.user_id=users.id
        WHERE messages.id = ?`, [id]
      );

      if(!data[0]){
        return false;
      }

      return data[0];

    } catch (err) {
      return err;
    }
  }

  // Metodo que inserta un nuevo mensaje en la tabla, retorna el nuevo registro
  // Recibe parametro -> body:object{content, user_id, project_id}
  static async create(body) {
    let query = await db.query(
      `INSERT INTO messages (content, user_id, project_id) VALUES (?,?,?) RETURNING *`, 
      [body.content, body.user_id, body.project_id]
    );
    return query[0];
  }

  // Metodo que actualiza un mensaje de la tabla, retorna el registro actualizado
  // Recibe como parametro -> body ( nuevos datos para edicion )
  async update(body) {
    let query = await db.queryPatch(`UPDATE messages SET data? WHERE id = ? RETURNING *`, [body, this.id] );
    return query[0];
  }

  // Metodo que elimina en mensaje de la tabla, retorna la informacion de la consulta
  async delete() {
    let data = await db.query(`DELETE FROM messages WHERE id = ?`, [this.id]);
    return data;
  }
}

module.exports = Message;