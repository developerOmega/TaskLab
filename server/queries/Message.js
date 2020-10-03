const Model = require('./Model');
const {db} = require('../../db/db');

class Message extends Model {
  constructor(message) {
    super(message);
    this.content = message.content;
    this.user_id = message.user_id;
    this.project_id = message.project_id;
  }

  static async all () {
    let data = await db.query(`SELECT * FROM messages`);
    return data;
  }

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

  static async create(body) {
    let query = await db.query(
      `INSERT INTO messages (content, user_id, project_id) VALUES (?,?,?) RETURNING *`, 
      [body.content, body.user_id, body.project_id]
    );
    return query[0];
  }

  async update(body) {
    let query = await db.queryPatch(`UPDATE messages SET data? WHERE id = ? RETURNING *`, [body, this.id] );
    return query[0];
  }

  async delete() {
    let data = await db.query(`DELETE FROM messages WHERE id = ?`, [this.id]);
    return data;
  }
}

module.exports = Message;