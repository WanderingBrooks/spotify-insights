'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

class spotifyApi {
  constructor( cfg ) {
    this.api = new SpotifyWebApi( cfg );
  }

  async refreshAccessToken() {
    const { body } = await this.api.clientCredentialsGrant();

    this.api.setAccessToken( body['access_token'] );

    setTimeout(
      this.refreshAccessToken.bind( this ),
      ( body['expires_in'] - 10 ) * 1000
    );
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

  async getAlbum( albumID ) {
    const { body } = await this.api.getAlbum( albumID );

    return body;
  }

  async getAlbumWithAudioFeatures( id ) {
    const album              = await this.getAlbum( id );
    const trackIds           = album.tracks.items.map( ({ id }) => id );
    const { audio_features } = await this.getAudioFeaturesForTracks( trackIds );

    const audioFeatures = album.tracks.items.map( ( track, index ) => {
      return { ...track, ...audio_features[ index ] };
    });

    album.tracks = audioFeatures;

    return album;
  };

}

const sharedAPI = new spotifyApi({
  clientId:     process.env.clientId,
  clientSecret: process.env.clientSecret
});

sharedAPI.refreshAccessToken();

module.exports = sharedAPI;
