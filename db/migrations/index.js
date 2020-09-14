const Migration = require('./Migration');
const argv = require('../../config/configYargs');

let migration = new Migration;
migration.excuteQuery(argv.query)
  .then(data => console.log(data))
  .catch(err => console.error(err));
