const { db } = require('../../db/db');
const Model = require('./Model');

class UserProject extends Model{
  constructor(userProject) {
    this.user_id = userProject.user_id;
    this.project_id = userProject.project_id;
    this.admin = userProject.admin;
  }

  static async create (body) {

    let query = await db.query(
      `INSERT INTO user_projects (user_id, project_id, admin) VALUES (?,?, ?)`, 
      [ body.user_id, body.project_id, body.admin ]
    )

    let data = await db.query(
      `SELECT * FROM user_projects WHERE user_id = ? AND project_id = ?`, 
      [body.user_id, body.project_id]
    );

    return data[0];
    
  }

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