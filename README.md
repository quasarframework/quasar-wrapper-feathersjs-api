![Quasar Framework logo](https://cdn.rawgit.com/quasarframework/quasar-art/863c14bd/dist/svg/quasar-logo-full-inline.svg)

# Quasar Framework Feathers API Wrapper
> Build full web apps with Quasar/Feathers as a frontend/backend solution.

**This is a work in progress, not ready for production use and not yet part of the official Quasar framework**.

Although this wrapper is intended to be a standalone module it plays nice with the Quasar Feathers demo template https://github.com/claustres/quasar-templates/tree/feathers-api. To create your Quasar app starting from this template run: `quasar init @claustres/quasar-templates#feathers-api <app-folder-name>`, then jump into your app folder.

If you look for a template including Server-Side Rendering (SSR) use the [ssr branch](https://github.com/quasarframework/quasar-wrapper-feathersjs-api/tree/ssr) instead, which plays nice with the default Quasar template https://github.com/quasarframework/quasar-template-default.

## Wrap your Quasar app
When integrated to Quasar from your root app dir you will have to run: `$ quasar wrap api feathers`

**While it is a work in progress, you can wrap it from your root app dir using**: `quasar init @quasarframework/quasar-wrapper-feathersjs-api#dev api`

Then from the backend wrapper folder called **api** install the server-side app dependencies: `$ npm install`

## Running for development
Make sure you keep running your frontend Quasar app (from root project folder): `$ quasar dev`

Then from the backend wrapper folder run the server-side app: `$ npm run dev`

## Building for production
Build your frontend Quasar app (from root project folder): `$ quasar build`.

Then from the backend wrapper folder build the server-side app: `$ npm run build`

## Running in production
From the backend wrapper folder run the server-side app: `$ npm run prod`

# What exactly provides this wrapper ?
> Mainly server-side code with babel integration to support ES2017.

The key points are the following:
- **src** directory host server-side code with a server entry point **main.js** that simply start a Feathers server
- **babel CLI** is used as a development dependency to transpile server-side code
- **dist** output directory is for transpiled backend files
- npm **clean** script cleans up transpiled code
- npm **dev** script runs the server in development mode on port 8081 by default (see **config** directory), client should be served as usual with Webpack
- npm **prod** script runs the server in production mode and serve client production version with Feathers
- **nodemon** is used as development dependency to watch changes in server side code and restart transpilation/server when required
- server-side **debug** mode in node is activated by default for development
- include a basic Feathers app **structure/setup** with models, services and hooks
- include a basic Feathers **datastore** based on a local NeDB
- include the Feathers **authentication** module
- include a basic **model** (a chat message) as an example

## License

Copyright (c) 2017 Luc Claustres

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
