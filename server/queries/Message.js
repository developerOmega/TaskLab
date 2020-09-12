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

  static async create(body) {
    let query = await db.query(
      `INSERT INTO messages (content, user_id, project_id) VALUES (?,?,?)`, 
      [body.content, body.user_id, body.project_id]
    );

    let data = await db.query(`SELECT * FROM messages WHERE id = ?`, [query.insertId]);
    return data[0];
  }

  async update(body) {
    let query = await db.query(`UPDATE messages SET ? WHERE id = ?`, [body, this.id]);
    let data = await db.query(`SELECT * FROM messages WHERE id = ?`, [this.id]);
    return data[0];
  }

  async delete() {
    let data = await db.query(`DELETE FROM messages WHERE id = ?`, [this.id]);
    return data;
  }
}

module.exports = Message;