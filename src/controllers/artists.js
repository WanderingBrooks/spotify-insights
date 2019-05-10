'use strict';

const spotifyAPI = require('../resources/spotifyAPI');

const albumRequests =  {
  async search( req, res ) {
    const { q }   = req.query;
    const results = await spotifyAPI.searchArtists( q );

    res.send( results );
  },

  async getArtistWithAudioFeatures( req, res ) {
    const { id }  = req.params;
    const results = await spotifyAPI.getArtistWithAudioFeatures( id );

    res.send( results );
  }
};

module.exports = albumRequests;
