'use strict';

const Bundler = require('parcel-bundler');

module.exports = ( app ) => {
  app.use( '/api/album',    require('./album') );
  app.use( '/api/playlist', require('./playlist') );

  const bundlerOptions = { production: process.env.NODE_ENV === 'production' };

  app.use( new Bundler( './index.html', bundlerOptions ).middleware() );
};
