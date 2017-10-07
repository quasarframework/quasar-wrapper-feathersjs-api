const path = require('path');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const ssr = require('./ssr');
const statics = require('./statics');

const api = feathers();

// Load app configuration
api.configure(configuration(path.join(__dirname, '..')));

// Enable CORS, security, compression, and body parsing
api.use(cors());
api.use(helmet());
api.use(compress());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

// Set up Plugins and providers
api.configure(hooks());
api.configure(rest());
api.configure(socketio());

// Set up our services (see `services/index.js`)
api.configure(services);
// Configure middleware (see `middleware/index.js`) - always has to be last
api.configure(middleware);
api.hooks(appHooks);

const app = feathers()

  // Load app configuration
  .configure(configuration(path.join(__dirname, '..')))

  // Adds api prefix to api requests. 
  .use('/api', api)
  
  .configure(socketio())

  // Static files will be hosted on root
  .configure(statics)

  // Render the app server side first for better SEO and speed
  .configure(ssr);

module.exports = app;
