'use strict';


const Bundler       = require('parcel-bundler');
const staticBundler = require('../resources/staticBundler');
const path          = require('path');

let route;

if ( process.env.NODE_ENV !== 'production' ) {
  const filePath = path.resolve( __dirname, '../../index.html' );
  route          = new Bundler( filePath ).middleware();
} else {
  const filePath = path.resolve( __dirname, '../../dist' );
  route          = staticBundler( filePath );
}

module.exports = route;
