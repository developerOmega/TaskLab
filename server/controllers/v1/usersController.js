const { db } = require('../../../db/db');
const bcrypt = require('bcrypt');

class UsersController {

  static async index (req, res) {
    let init = req.query.init;
    let end = req.query.end;

    try {
      
      let data = init && end ? 
        await db.query(`SELECT * FROM users WHERE id >= ? AND id <= ?`, [init, end]) :
        await db.query(`SELECT * FROM users`);
        
      return res.status(200).json({
        ok: true,
        data: data
      });

    } 
    catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });

    }

  }

  static async show(req, res) {
    let id = req.params.id;

    try{
      let data = await db.query(
        `SELECT * FROM users WHERE id = ?`,
        [id]
      );

      return res.status(200).json({
        ok: true,
        data: data[0]
      });

    } catch(err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }

  static async post(req, res) {
    let body = req.body;

    try {
      let query = await db.query(
        `INSERT INTO users (name, email, password, img, verify) VALUES (?,?,?,?,?)`,
        [body.name, body.email, bcrypt.hashSync(body.password, 10), body.img, body.verify]
      );

      let data = await db.query( `SELECT * FROM users WHERE id = ?`, [query.insertId] );

      res.status(200).json({
        ok: true,
        data: data[0]
      });

    } catch (err) {
      res.status(400).json({
        ok: false,
        err
      })
    }
  }

  static async update(req, res) {
    let body = req.body;
    let id = req.params.id;

    delete body.password;

    try {
      
      let query = await db.query( `UPDATE users SET ? WHERE id = ?`, [body, id] );
      let data = await db.query( `SELECT * FROM users WHERE id = ?`, [id] );

      return res.status(200).json({
        ok: true,
        data: data[0]
      });

    } catch (err) {
      
      return res.status(400).json({
        ok: false,
        err
      });

    }

  }

  static async destroy(req, res) {
    let id = req.params.id;

    try {
      
      let data = await db.query(`DELETE FROM users WHERE id = ?`, [id]);

      return res.status(200).json({
        ok: true,
        message: "El usuario se ha eliminado con exito"
      });

    } catch (err) {

      return res.status(400).json({
        ok: false,
        err
      });

    }
  }

  static async indexProjects(req, res) {
    let id = req.params.id;

    try {
      let data = await db.query(
        `SELECT projects.id, projects.name, projects.description, projects.status, projects.user_id, projects.updated_at, projects.created_at
        FROM projects INNER JOIN user_projects ON projects.id=user_projects.project_id
        INNER JOIN users ON user_projects.user_id=users.id 
        WHERE users.id=?;`,
        [id]
      );

      if(data.length < 1) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "El ususario no tiene proyectos"
          }
        });
      }

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

  }
}

module.exports = { UsersController };