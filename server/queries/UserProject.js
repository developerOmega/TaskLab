const { db } = require('../../db/db');
const Model = require('./Model');

// Clase que administra los queries de la tabla 'user_projects'

class UserProject extends Model{

  // Constructos que iniciliza las propiedades: user_id, project_id y admin
  constructor(userProject) {
    this.user_id = userProject.user_id;
    this.project_id = userProject.project_id;
    this.admin = userProject.admin;
  }

  // Metodo que inserta una nueva relacion user_projects en la tabla, retorna el nuevo regostro
  // Recibe parametro -> body:object{user_id, project_idm admin}
  static async create (body) {

    let query = await db.query(
      `INSERT INTO user_projects (user_id, project_id, admin) VALUES (?,?, ?) RETURNING *`, 
      [ body.user_id, body.project_id, body.admin ]
    )
    return query[0];
  }

  // Metodod que retorna la relacion user_peojects por id
  // Recibe parametros: user_id:number (id de ususario), project_id:number (id de projecto)
  static async byId (user_id, project_id) {
    try {
      let data = await db.query(
        `SELECT * FROM user_projects WHERE user_id=? AND project_id=?`,
        [user_id, project_id]
      );

      if( !data[0] ) {
        return false;        
      }

      let instance = new UserProject(data[0]);
      return instance;

    } catch (err) {
      return err;
    }
  }

  // Metodo que retorna retorna la relacion user_projects por id y admin=true
  // Recibe parametros: user_id:number (id de ususario), project_id:number (id de projecto)
  static async byIdAdmin (user_id, project_id) {
    try {
      let data = await db.query(
        `SELECT * FROM user_projects WHERE user_id=? AND project_id=? AND admin=?`,
        [user_id, project_id, 1]
      );

      if (!data[0]) {
        return false;
      }

      let instance = new UserProject(data[0]);
      return instance;

    } catch (err) {
      return err;
    }
  }

  // Metodo que elimina relacion user_projects de tabla, retorna informacion de consulta
  // Recibe parametros: user_id:number (id de ususario), project_id:number (id de projecto) 
  static async deleteById(user_id, project_id) {
    try {
      let data = await db.query(
        `DELETE FROM user_projects WHERE user_id=? AND project_id=?`,
        [user_id, project_id]
      );

      return data;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserProject;