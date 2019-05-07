'use strict';

const spotifyAPI = require('../resources/spotifyAPI');

const albumRequests =  {
  async search( req, res ) {
    const { title } = req.query;
    const results   = await spotifyAPI.searchAlbums( title );

    res.send( results );
  },

  async getAlbumAudioFeatures( req, res ) {
    const { id }  = req.query;
    const results = await spotifyAPI.getAlbumAudioFeatures( id );

    res.send( results );
  }
};

module.exports = albumRequests;
