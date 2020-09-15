const Model = require('./Model');
const { db } = require('../../db/db');

// Clase que administra los queries de la tabla 'user_tasks'

class UserTask extends Model {

  // Constructor que inicializa las propiedades: user_id y tasks_id
  constructor(userTask) {
    this.user_id = userTask.user_id;
    this.task_id = userTask.task_id;
  }

  // Metodo que inserta una nueva relacion users_tasks en la tabla, retorna nuevo registro
  // Recibe parametro -> body:object{user_id, tasks_id}
  static async create (body) {
    let query = await db.query(
      `INSERT INTO user_tasks (user_id, task_id) VALUES (?,?) RETURNING *`, 
      [ body.user_id, body.task_id ]
    )
    return query[0];
  }

  // Metodo que retorna la relacion user_task por id
  // Recibe parametros -> userId:number (id de user), tasksId:number (id de tarea)
  static async byId (userId, taskId) {
    try {
      let data = await db.query(
        `SELECT * FROM user_tasks WHERE user_id=? AND task_id=?`,
        [ userId, taskId ]
      );

      if(!data[0]) {
        return false;
      }

      let instance = new UserTask(data[0]);
      return instance;

    } catch (err) {
      return err;
    }
  }

  // Metodo que elimina relacion user_task de la tabla, retorna informacion de la consulta
  // Recibe parametros -> userId:number (id de user), tasksId:number (id de tarea)
  static async deleteById (userId, taskId) {
    try {
      let data = await db.query(
        `DELETE FROM user_tasks WHERE user_id=? AND task_id=?`,
        [userId, taskId]
      );
      return data;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserTask;