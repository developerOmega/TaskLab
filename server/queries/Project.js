const Model = require('../queries/Model');
const { db } = require('../../db/db');

// Clase que administra los queries de la tabla 'projects'

class Project extends Model{

  // Consturctor inicializa propiedades: name, description, status, user_id
  constructor (project) {
    super(project);

    this.name = project.name,
    this.description = project.description;
    this.status = project.status;
    this.user_id = project.user_id;

  }

  // Metodo que retorna todos los proyectos
  static async all () {
    let data = await db.query(`SELECT * FROM project`);
    return data;
  }

  // Metodo que retorna los proyectos en paginacion
  static async paginate (init = 0, end = 0) {
    let data = init != 0 && end != 0 ?
      await db.query(`SELECT * FROM projects WHERE id >= ? AND id <= ?`, [init, end]) :
      await db.query(`SELECT * FROM projects`);
    
    return data;
  }

  // Metodo que retorna los proyectos por id
  static async byId (id) {
    try {
      
      let data = await db.query(`SELECT * FROM projects WHERE id = ?`, [id]);
      
      if(!data[0]) {
        return false;
      }
      
      let instance = new Project(data[0]);   
      return instance;

    } catch (err) {
      return err;
    }
  }

  // Metodo  que crea un nuevo registro en la tabla, retorna el nuevo registro
  // Recibe parametros -> body:object{name, description, status, user_id}
  static async create ( body ) {
    let query = await db.query(
      `INSERT INTO projects (name, description, status, user_id) VALUES (?,?,?,?) RETURNING *`,
      [body.name, body.description, body.status, body.user_id]
    );      
    return query[0];
  }

  // Metodo que actualiza un proyecto de la tabla, retorna el registro actualizado
  // Recibe parametro -> body:object ( nuevos datos para edicion )
  async update ( body ) {
    let query = await db.queryPatch(`UPDATE projects SET data? WHERE id =  ? RETURNING *`, [body, this.id]);
    return query[0];
  }

  // Metodo que elimina un proyecto del la tabla, retorna informacion de la consulta
  async delete () {
    let data = await db.query(`DELETE FROM projects WHERE id = ?`, [this.id]);
    return data;
  }

  // Metodo que retorna el usuario del proyecto
  async user () {
    let data = await db.query(
      `SELECT users.id, users.name, users.email, users.img, users.verify, users.active, users.updated_at, users.created_at
      FROM projects INNER JOIN users ON projects.user_id=users.id
      WHERE projects.id= ?`, [this.id]
    );

    return data[0]
  }

  // Metodo que retorna los usuarios del proyecto
  async users () {
    let data = await db.query(
      `SELECT users.id, users.name, users.email, users.img, users.verify, users.active, user_projects.admin, users.updated_at, users.created_at
      FROM projects INNER JOIN user_projects ON projects.id=user_projects.project_id
      INNER JOIN users ON user_projects.user_id=users.id
      WHERE projects.id = ?`, [this.id]
    );

    return data;
  }

  // Metodo que retorna los mensajes del proyecto
  async messages () {
    let data = await db.query(
      `SELECT messages.id, messages.content, users.name, users.email, users.img, messages.updated_at, messages.created_at 
      FROM messages INNER JOIN users ON messages.user_id=users.id
      INNER JOIN projects ON messages.project_id=projects.id
      WHERE projects.id = ?`, [this.id]
    );

    return data;
  }

  // Metodo que retorna los eventos del proyecto
  async events () {
    let data = await db.query( `SELECT * FROM events WHERE project_id=? ORDER BY time_end DESC`, [this.id] );
    return data;
  }

  // Metodo que retorna las tareas del proyecto
  async tasks () {
    let data = await db.query( `SELECT * FROM tasks WHERE project_id=? ORDER BY time_end DESC, updated_at DESC`, [this.id] );
    return data;
  }

}

module.exports = Project;