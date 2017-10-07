const clientConfig = require('../../config');
const path = require('path');

module.exports = {
  "client": clientConfig,
  "host": "localhost",
  "port": 3030,
  "public": "../../src/",
  "dist": "../../dist/",
  "ssr": path.join(
    "../", 
    clientConfig.ssrBuildOutputFolder || 'ssr/'
  ),
  "paginate": {
    "default": 10,
    "max": 50
  }
}
