'use strict';

const router = require('express').Router();
const albums = require('../controllers/albums');

router.get( '/',         albums.search );
router.get( '/features', albums.getAlbumAudioFeatures );

module.exports = router;
