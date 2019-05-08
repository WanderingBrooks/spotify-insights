'use strict';

const Bundler = require('parcel-bundler');
const path    = require('path');

const bundlerOptions = { production: process.env.NODE_ENV === 'production' };
const filePath       = path.resolve( __dirname, '../../index.html' );

const bundler = new Bundler( filePath, bundlerOptions );

module.exports = bundler.middleware();
