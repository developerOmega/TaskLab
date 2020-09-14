const argv = require('yargs').options({
  hola: {
    alias: 'ho',
    desc: "Saludar"
  },
  query: {
    alias: 'q',
    desc: "Ejecutar un query",
    // demand: true
  }
}).argv;


module.exports = argv;