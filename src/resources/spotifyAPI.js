'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

class spotifyApi {
  constructor( cfg ) {
    this.api = new SpotifyWebApi( cfg );
    this.refreshAccessToken();
  }

  async refreshAccessToken() {
    const { body } = await this.api.clientCredentialsGrant();

    this.api.setAccessToken( body['access_token'] );
    setTimeout( this.refreshAccessToken, body['expires_in'] - 10000 );
  }

  async searchAlbums( query ) {
    const { body } = await this.api.searchAlbums( query );

    return body;
  }

  async searchPlaylists( query ) {
    const { body } = await this.api.searchPlaylists( query );

    return body;
  }

  async getAudioFeaturesForTracks( trackIDs ) {
    const { body } = await this.api.getAudioFeaturesForTracks( trackIDs );

    return body;
  }

  async getAlbumTracks( albumID ) {
    const { body } = await this.api.getAlbumTracks( albumID );

    return body;
  }

  async getAlbumAudioFeatures( id ) {
    const { items }  = await this.getAlbumTracks( id );

    const trackIds           = items.map( ({ id }) => id );
    const { audio_features } = await this.getAudioFeaturesForTracks( trackIds );

    const audioFeatures = items.map( ( track, index ) => {
      return { ...track, ...audio_features[ index ] };
    });

    return audioFeatures;
  };

}

const sharedAPI = new spotifyApi({
  clientId:     process.env.clientId,
  clientSecret: process.env.clientSecret
});

module.exports = sharedAPI;
