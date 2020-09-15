const Model = require('../queries/Model');
const { db } = require('../../db/db');

// Clase que administra los queries de la tabla 'events'

class Event extends Model{

  // Constructro inicializa las propiedades name, description, time_init, time_end y project_id
  constructor(event) {
    super(event);
    this.name = event.name;
    this.description = event.description;
    this.time_init = event.time_init;
    this.time_end = event.time_end;
    this.project_id = event.project_id;
  }

  // Metodo que retorna todos los eventos
  static async all () {
    let data = await db.query(`SELECT * FROM events`);
    return data;
  }

  // Metodo que retorna los evento paginados
  // Recibe parametros -> init:number (id inicial), end:number (id limite)
  static async paginate (init = 0, end = 0) {
    let data = init != 0 && end != 0 ? 
      await db.query(`SELECT * FROM events WHERE id >= ? AND id <= ?`, [init, end]) :
      await db.query(`SELECT * FROM events`);

    return data;
  }

  // Metodo que retorna eventos por id
  // Recibe parametro -> id:number (id de evento)
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

  // Metodo que inserta un nuevo registro en la tabla, retorna nuevo registro
  // Recibe parametro -> body:object{ name, description, time_init, time_end, project_id }
  static async create (body) {
    let query = await db.query(
      `INSERT INTO events (name, description, time_init, time_end, project_id) VALUES (?,?,?,?, ?) RETURNING *`,
      [body.name, body.description, body.time_init, body.time_end, body.project_id]
    )
    return query[0];
  }

  // Metodo que actualiza un registro por id en la tabla, retorna registro actualizado
  // Recibe parametro -> body:object (nuevos datos para edicion)
  async update (body) {
    let query = await db.queryPatch(`UPDATE events SET data? WHERE id=? RETURNING *`, [body, this.id]);
    return query[0];
  }

  // Metodo que elimina un registro por id en la tabla, retorna respuesta de la consulta
  async delete () {
    let data = await db.query(`DELETE FROM events WHERE id = ?`, [this.id]);
    return data;
  }


}

module.exports = Event;