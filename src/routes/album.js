'use strict';

const router = require('express').Router();
const albums = require('../controllers/albums');

router.get( '/',    albums.search );
router.get( '/:id', albums.getAlbumWithAudioFeatures );

module.exports = router;
