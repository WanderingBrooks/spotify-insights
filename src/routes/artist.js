'use strict';

const router = require('express').Router();
const artists = require('../controllers/artists');

router.get( '/',    artists.search );
router.get( '/:id', artists.getArtistWithAudioFeatures );

module.exports = router;
