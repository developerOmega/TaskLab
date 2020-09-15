const Model = require('./Model');
const { db } = require('../../db/db');

// Clase que administra los queries de la tabla 'users'

class User extends Model {

  // Constructor que inicializa las propiedades: name, email, password, img, verify, active
  constructor(user) {
    super(user);
    this.name = user.name;
    this.email = user.email;
    this.password = user.password,
    this.img = user.img;
    this.verify = user.verify;
    this.active = user.active;
  }

  // Metodo que retorna todos los usuarios
  static async all() {
    let data = await db.query(`SELECT * FROM users`);
    return data;
  }

  // Metodo que retorna los usuarios paginados
  static async paginate(init = 0, end = 0) {
    let data = init != 0 && end != 0 ? 
      await db.query(`SELECT * FROM users WHERE id >= ? AND id <= ?`, [init, end]) :
      await db.query(`SELECT * FROM users`);
    return data;
  }

  // Metodo que retorna los usuarios por id
  static async byId(id) {
    try {
      let data = await db.query(`SELECT * FROM users WHERE id=?`, [id]);
      
      if(!data[0]) {
        return false;
      }
      let instance = new User(data[0]);
      return instance;
    } catch (err) {
      return err;
    }
  }

  // Metodo que retorna los usuarios por email
  static async byEmail(email) {
    try{
      let user = await db.query(`SELECT * FROM users WHERE email=?`, [email]);
      if(!user[0]) {
        return false
      }
      let instance = new User(user[0]);
      return instance;
    } catch (err) {
      return err;
    }
  }

  // Metodo que inserta un nuevo usuario en la tabla, retorna nuevo registro
  // Recibe parametro -> body:object{name, email, body, password, verify}
  static async create(body) {
    let query = await db.query(
      `INSERT INTO users (name, email, password, verify) VALUES (?,?,?,?) RETURNING *`,
      [body.name, body.email, body.password, body.verify]
    );
    return query[0];
  }

  // Metodo que actualiza un usuario de la tabla, retorna registro actualizado
  // Recibe parametro -> body:object ( nuevos datos para edicion )
  async update(body) {
    let query = await db.queryPatch( `UPDATE users SET data? WHERE id=? RETURNING *`, [body, this.id] );
    return query[0];
  }

  // Metodo que elimina un usuario de la tabla, retorna informacion de la consulta
  async delete() {
    let data = await db.query(`DELETE FROM users WHERE id = ?`, [this.id]);
    return data;
  }

  // Metodo que retorna proyectos del usaurios
  async projects() {
    let data = await db.query(
      `SELECT projects.id, projects.name, projects.description, projects.status, projects.user_id, projects.updated_at, projects.created_at
      FROM projects INNER JOIN user_projects ON projects.id=user_projects.project_id
      INNER JOIN users ON user_projects.user_id=users.id 
      WHERE users.id=?;`,
      [this.id]
    );
    return data;
  }

  // Metodo hace la convercion de la url publica de Dropbox a url de imagen, retorna nueva url
  // Recibe parametro -> url:string (url Dropbox)
  static imageUrl(url) {
  
    if(url.match(/www.dropbox.com/)){
      let regex = /www.dropbox.com/;
      let imageUrl = url.replace(regex, 'dl.dropboxusercontent.com');
      imageUrl = imageUrl.replace( /[?]dl=0/, '' );
      return imageUrl;
    }
  
  }
}

module.exports = User;