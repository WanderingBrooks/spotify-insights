'use strict';

const express   = require('express');
const setRoutes = require('./src/routes');

const app = express();

setRoutes( app );

app.listen( 1234 );
