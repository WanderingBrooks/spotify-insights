'use strict';

module.exports = ( app ) => {
  if ( process.env.NODE_ENV === 'production' ) {
    app.use( require('./forceHttps') );
  }

  app.use( '/api/album',    require('./album') );
  app.use( '/api/playlist', require('./playlist') );
  app.use( require('./bundler') );
};
