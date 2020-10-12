const Model = require('./Model');
const {db} = require('../../db/db');

// Clase que administra los queries de la tabla 'tasks'

class Task extends Model {

  // Consturctor que inicializa las propiedades: description, status, time_init, time_end y proyect_id
  constructor(task) {
    super(task);
    this.description = task.description;
    this.status = task.status;
    this.time_init = task.task_init;
    this.time_end = task.task_end;
    this.project_id = task.project_id;
  }

  // Metodo que retorna todas las tareas
  static async all () {
    let data = await db.query(`SELECT * FROM tasks`);
    return data;
  }

  // Metodo que retorna las tareas paginadas
  static async paginate (init = 0, end = 0) {
    let data = init != 0 && end != 0 ? 
      await db.query(`SELECT * FROM tasks WHERE id >= ? AND id <= ? ORDER BY id ASC`, [inti, end]) :
      await db.query(`SELECT * FROM tasks`);
    return data;
  }

  // Metodo que retorna las tareas por id
  static async byId(id) {
    try {
      let data = await db.query(`SELECT * FROM tasks WHERE id=?`, [id]);
      if(!data[0]){
        return false;
      }
      let instance = new Task(data[0]);
      return instance;
    } catch (err) {
      return err;
    }
  }

  // Metodo que inserta una nueva tarea en la tabla, retorna el nuevo registro
  // Recibe parametro -> body:object{decription, status, time_init, time_end, project_id}
  static async create(body) {
    let query = await db.query(
      `INSERT INTO tasks (description, status, time_init, time_end, project_id) VALUES (?,?,?,?, ?) RETURNING *`,
      [body.description, body.status, body.time_init, body.time_end, body.project_id]
    );
    return query[0];
  }

  // Metodo que actualiza una tarea de la tabla, retorna la tarea actualizada
  // Recibe parametros -> body:object ( nuevos datos para edicion )
  async update(body) {
    let query =  await db.queryPatch(`UPDATE tasks SET data? WHERE id = ? RETURNING *`, [body, this.id]);
    return query[0];
  }

  // Metodo que elimina una tarea de la tabla, retorna infromacion de la consulta
  async delete() {
    let data = await db.query( `DELETE FROM tasks WHERE id = ?`, [this.id]);
    return data;
  }

  // Metodo que retorna los usuarios de la tarea
  async users() {
    let data = await db.query(
      `SELECT users.id, users.name, users.img, users.email, users.verify, users.active, users.updated_at, users.created_at
      FROM tasks INNER JOIN user_tasks ON tasks.id=user_tasks.task_id
      INNER JOIN users ON user_tasks.user_id=users.id
      WHERE tasks.id=?;`,
      [this.id]
    );
    return data;
  }

}

module.exports = Task;