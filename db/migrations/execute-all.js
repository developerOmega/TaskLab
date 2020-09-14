const Migration = require('./Migration');

class ExecuteAll extends Migration {
  
  static async run() {
    await require('./create-function-trigger-set-timestamp').run();
    await require('./create-table-users').run();
    await require('./create-table-projects').run();
    await require('./create-table-messages').run();
    await require('./create-table-events').run();
    await require('./create-table-tasks').run();
    await require('./create-table-user-projects').run();
    await require('./create-table-user-tasks').run();
    return this.tables('all');
  }

}

module.exports = ExecuteAll;