'use strict';

const express = require('express');
const Bundler = require('parcel-bundler');
const path    = require('path');

let route;

if ( process.env.NODE_ENV !== 'production' ) {
  const filePath = path.resolve( __dirname, '../../index.html' );
  route          = new Bundler( filePath ).middleware();
} else {
  route          = express.static( path.resolve( __dirname, '../../dist' ) );
}

module.exports = route;
