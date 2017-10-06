![Quasar Framework logo](https://cdn.rawgit.com/quasarframework/quasar-art/863c14bd/dist/svg/quasar-logo-full-inline.svg)

# Quasar Framework Feathers API Wrapper
> Build full web apps with Quasar/Feathers as a frontend/backend solution.
> Includes server side rendering for good SEO and inital page load speed

**This is a work in progress, not ready for production use and not yet part of the official Quasar framework**.

Although this wrapper is intended to be a standalone module it plays nice with the Quasar Feathers demo template https://github.com/claustres/quasar-templates/tree/feathers-api. To create your Quasar app starting from this template run: `quasar init @claustres/quasar-templates#feathers-api <app-folder-name>`, then jump into your app folder.

## Wrap your Quasar app
When integrated to Quasar from your root app dir you will have to run: `$ quasar wrap api feathers`

**While it is a work in progress, you can wrap it from your root app dir using**: `quasar init @quasarframework/quasar-wrapper-feathersjs-api#dev api`

Then from the backend wrapper folder called **api** install the server-side app dependencies: `$ npm install`

## Running for development
Make sure you keep running your frontend Quasar app (from root project folder): `$ quasar dev`

Then from the backend wrapper folder run the server-side app: `$ npm run dev`

## Building for production
Build your frontend Quasar app (from root project folder): `$ quasar build`.

## Running in production
From the backend wrapper folder run the server-side app: `$ npm run prod`

__NOTE:__ Requires node version 6 and up

# What exactly provides this wrapper ?

The key points are the following:
- npm **dev** script runs the server in development mode on port 3030 by default (see **config** directory), client should be served as usual with Webpack
- npm **prod** script runs the server in production mode and serve client production version with Feathers
- **nodemon** is used as development dependency to watch changes in server side code and restart the server when required
- server-side **debug** mode in node is activated by default for development
- include a basic Feathers app **structure/setup** with models, services and hooks

## License

Copyright (c) 2017 Jon Paul Miles

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
