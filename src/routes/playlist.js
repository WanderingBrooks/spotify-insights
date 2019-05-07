'use strict';

const router    = require('express').Router();
const playlists = require('../controllers/playlists');

router.get( '/', playlists.search );

module.exports = router;
