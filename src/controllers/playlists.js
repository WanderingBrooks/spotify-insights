'use strict';

const spotifyAPI = require('../resources/spotifyAPI');

const playlistRequests =  {
  async search( req, res ) {
    const { title } = req.query;
    const results   = await spotifyAPI.searchPlaylists( title );

    res.send( results );
  }
};

module.exports = playlistRequests;
