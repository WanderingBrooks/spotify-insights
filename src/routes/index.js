'use strict';

module.exports = ( app ) => {
  app.use( '/api/album',    require('./album') );
  app.use( '/api/playlist', require('./playlist') );
  app.use( '/',             require('./bundler') );
  app.use( '/*',            require('./bundler') );
};
