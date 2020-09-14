const { db } = require('../db');
const Migration = require('./Migration');

class CreateFunctionTriggerSetTimestam extends Migration {

  static async run () {
    let query = await db.query(
      `CREATE OR REPLACE FUNCTION trigger_set_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;`
    );
    return query;
  }

}

module.exports = CreateFunctionTriggerSetTimestam;