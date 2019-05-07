'use strict';

const Bundler = require('parcel-bundler');

module.exports = ( app ) => {
  app.use( '/api/album',    require('./album') );
  app.use( '/api/playlist', require('./playlist') );

  app.use( new Bundler('./index.html').middleware() );
};
