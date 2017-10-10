/**
 * Concepts and snippets taken from
 * vue-hackernews-2.0
 * https://github.com/vuejs/vue-hackernews-2.0
 * License MIT
 */
const isProd = process.env.NODE_ENV === 'production';
const path = require('path');
const fs = require('fs');
const feathers = require('feathers');
const favicon = require('serve-favicon');

// Prevent the dev server from generating it's own html file, we want to use our SSR generated one
process.env.dismissHTML = true;
const { createBundleRenderer } = require('vue-server-renderer');

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: isProd ? require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }) : undefined,
    // recommended for performance
    runInNewContext: false
  }));
}

module.exports = function() {
  const app = this;

  const templatePath = path.join(app.get('src'), 'index.html');

  let renderer, readyPromise;

  if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8');

    const serverBundle = require(path.join( 
      app.get('public'),
      'vue-ssr-server-bundle.json' 
    ));

    const clientManifest = require(path.join( 
      app.get('public'),
      'vue-ssr-client-manifest.json' 
    ));

    renderer = createRenderer(serverBundle, {
      template: template.replace(
        '<div id="q-app"></div>', 
        '<!--vue-ssr-outlet-->'
      ),
      clientManifest
    });

    // Serve static assets
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

  } else {

    app.use(favicon(path.join(app.get('src'), 'statics', 'favicon.ico')));

    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = require(
      path.join(app.get('build'), 'setup-dev-server')
    )(
      app,
      templatePath,
      (bundle, options) => {
        renderer = createRenderer(bundle, options);
      }
    );
  }

  function renderHtml(req, res) {
    
    var context = { url: req.url };

    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.warn('Error with SSR:', err);
        return res.status(500).send('Sorry, but there was a problem on the server and this page could not be rendered.');
      }

      return res.status(200).send(html);
    });
  }

  app.get('/*', isProd ? renderHtml : (req, res) => {
    readyPromise.then(() => renderHtml(req, res));
  });
};