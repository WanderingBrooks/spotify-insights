'use strict';

module.exports = ( req, res, next ) => {
  const xfp = (
    req.headers['x-forwarded-proto'] || req.headers['X-Forwarded-Proto']
  );

  if ( xfp && xfp !== 'https' ) {
    return res.redirect( `https://${ req.headers.host }${ req.url }` );
  }

  return next();
};
