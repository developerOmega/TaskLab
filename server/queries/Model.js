// Clase padre de Model

class Model {

  // Constructor inicializa peopiedades: id, update_at, created_at (Estas propiedades existe en todas las tablas)
  constructor (model) {
    this.id = model.id;

    this.updated_at = model.updated_at;
    this.created_at = model.created_at;
  }

  static async all () {
    return 0;
  }

  static async paginate (init = 0, end = 0) {
    return [init, end];
  }

  static async byId (id) {
    return id;
  }

  static async create (body) {
    return body;
  }

  async udpate (body) {
    return body;
  }

  async delete () {
    return 0;
  }

}

module.exports = Model;