const Model = require('../queries/Model');
const { db } = require('../../db/db');

class Event extends Model{
  constructor(event) {
    super(event);
    this.name = event.name;
    this.description = event.description;
    this.time_init = event.time_init;
    this.time_end = event.time_end;
    this.project_id = event.project_id;
  }

  static async all () {
    let data = await db.query(`SELECT * FROM events`);
    return data;
  }

  static async paginate (init = 0, end = 0) {
    let data = init != 0 && end != 0 ? 
      await db.query(`SELECT * FROM events WHERE id >= ? AND id <= ?`, [init, end]) :
      await db.query(`SELECT * FROM events`);

    return data;
  }

  static async byId (id) {
    try {
      let data = await db.query(`SELECT * FROM events WHERE id=?`, [id]);

      if(!data[0]) {
        return false;
      }

      let instance = new Event(data[0]);
      return instance;

    } catch (err) {
      return err;
    }
  }

  static async create (body) {
    let query = await db.query(
      `INSERT INTO events (name, description, time_init, time_end, project_id) VALUES (?,?,?,?, ?)`,
      [body.name, body.description, body.time_init, body.time_end, body.project_id]
    )

    let data = await db.query(`SELECT * FROM events WHERE id = ?`, [query.insertId]);
    return data[0];          
  }

  async update (body) {
    let query = await db.query(`UPDATE events SET ? WHERE ?`, [body, this.id]);
    let data = await db.query(`SELECT * FROM events WHERE id = ?`, [this.id]);

    return data[0];
  }

  async delete () {
    let data = await db.query(`DELETE FROM events WHERE id = ?`, [this.id]);
    return data;
  }


}

module.exports = Event;