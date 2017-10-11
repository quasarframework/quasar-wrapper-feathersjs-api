const clientConfig = require('../../config');
const { get } = require('lodash');

module.exports = {
  "client": clientConfig,
  "host": "localhost",
  "port": get(clientConfig, 'server.port') || 3030,
  "public": "../../dist/",
  "build": "../../build/",
  "ssr": "../ssr/",
  "src": "../../src/",
  "paginate": {
    "default": 10,
    "max": 50
  }
}
