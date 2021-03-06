'use strict';

const spotifyAPI = require('../resources/spotifyAPI');

const albumRequests =  {
  async search( req, res ) {
    const { q }   = req.query;
    const results = await spotifyAPI.searchAlbums( q );

    res.send( results );
  },

  async getAlbumWithAudioFeatures( req, res ) {
    const { id }  = req.params;
    const results = await spotifyAPI.getAlbumWithAudioFeatures( id );

    res.send( results );
  }
};

module.exports = albumRequests;
