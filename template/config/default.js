const clientConfig = require('../../config')

module.exports = {
  "client": clientConfig,
  "host": "localhost",
  "port": 3030,
  "public": "../../src/",
  "ssr": "../ssr/",
  "paginate": {
    "default": 10,
    "max": 50
  }
}
