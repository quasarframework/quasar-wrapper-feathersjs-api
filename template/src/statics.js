const feathers = require('feathers');
const favicon = require('serve-favicon');
const path = require('path');

module.exports = function() {
  const app = this;

  app.use(favicon(path.join(app.get('public'), 'statics', 'favicon.ico')));

  ['js', 'statics', 'fonts', 'img']
    .forEach(itemPath => {
      app.use(`/${itemPath}`, feathers.static(path.join(
        app.get('public'), itemPath
      )));
    });

  app.use('/app(.*).css', (req, res, next) => 
    feathers.static(
      path.join(
        app.get('public'), req.originalUrl
      )
    )(req, res, next)
  );
};