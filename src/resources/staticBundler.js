'use strict';

const express = require('express');
const url     = require('url');
const path    = require('path');

module.exports = ( filePath, options ) => {
  const serve = express.static( filePath, options );

  return ( req, res, next ) => {
    const { pathname } = url.parse( req.url );

    if ( !pathname.startsWith('/') || path.extname( pathname ) === '' ) {
      req.url = 'index.html';
    } else {
      req.url = pathname.slice( 1 );
    }

    return serve( req, res, next );
  };
};
