'use strict';

const spotifyAPI = require('../resources/spotifyAPI');

const albumRequests =  {
  async search( req, res ) {
    const { title } = req.query;
    const results   = await spotifyAPI.searchAlbums( title );

    res.send( results );
  },

  async getAlbumWithAudioFeatures( req, res ) {
    const { id }  = req.params;
    const results = await spotifyAPI.getAlbumWithAudioFeatures( id );

    res.send( results );
  }
};

module.exports = albumRequests;
