const React     = require('react');
const Main      = require('../components/Main');
const Search    = require('../components/Search');
const IndvStats = require('../components/IndvStats');
const TimeGraph = require('../components/TimeGraph');
const Image     = require('../components/Image');
const Table     = require('../components/Table');
const SearchBy  = require('../components/SearchBy');

import { Card, Grid } from 'tabler-react';

class Artist extends Main {
  constructor( props ) {
    super( props );
  }

  formatGenre( genre ) {
    const words = genre.split(' ');
    return words
      .map( word => `${ word.charAt( 0 ).toUpperCase() }${ word.slice( 1 ) }` )
      .join(' ');
  }

  formatFollowers( followers ) {
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    
    return followers.toString().replace( regex, ',' );
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Grid.Row>
              <Grid.Col width={ 2 }>
                <SearchBy
                  onChange   = { this.handleSearchBy.bind( this ) }
                  initialVal = { this.state.searchBy }
                  options    = { [
                    { value: 'album', display: 'Album' },
                    { value: 'artist', display: 'Artist' }
                  ] }
                />
              </Grid.Col>

              <Grid.Col>
                <Search
                  handler     = { this.handleItemChange.bind( this ) }
                  selected    = { this.state.selected }
                  searchBy    = { this.state.searchBy }
                />
              </Grid.Col>
            </Grid.Row>
          </Card.Body>
        </Card>

        {
          this.state.selected &&
          <div className='main-header'>
            <span>
              { this.state.selected.name }
            </span>
          </div>
        }

        {
          this.state.selected &&
          this.state.selected.images.length > 0 &&
          <Card>
            <Card.Body>
              <Grid.Row>
                <Grid.Col width={ 2 }>
                  <Image 
                    url    = { this.state.selected.images[ 0 ].url }
                  />
                  <Table
                    id      = { 'album-info' }
                    headers = { [] }
                    style   = {{ textAlign: 'center' }}
                    rows    = { [
                      [ this.formatGenre( this.state.selected.genres[ 0 ] || 'No Genre Listed' ) ], 
                      [ `${ this.formatFollowers( this.state.selected.followers.total ) } followers` ], 
                    ] }
                  />
                </Grid.Col>
                <Grid.Col>
                  <IndvStats
                    elementId = { 'bar-stats' }
                    tracks    = { this.state.selected.topTracks }
                    keys      = { this.state.keys }
                    labels    = { this.state.labels }
                    handler   = { this.handleGraph.bind( this ) }
                    id        = { this.state.id }
                  />
                </Grid.Col>
                <Grid.Col>
                  <TimeGraph
                    elementId = { 'line-stats' }
                    tracks    = { this.state.selected.topTracks }
                    keys      = { this.state.keys }
                    labels    = { this.state.labels }
                    handler   = { this.handleGraph.bind( this ) }
                    id        = { this.state.id }
                  />
                </Grid.Col>
              </Grid.Row>
            </Card.Body>
          </Card>
        }

        {
          this.state.selected &&
          this.state.selected.topTracks.length > 0 &&
          <Card>
            <Card.Body>
              <Grid.Col>
                <Table
                  id      = { 'tracks' }
                  headers = { [ 'Top Tracks' ]}
                  rows    = { this.state.selected.topTracks.map( ( track, index ) => [ `${ index + 1 }: ${ track.name }` ] ) }
                />
              </Grid.Col>
            </Card.Body>
          </Card>
        }

        {
          this.state.selected &&
          this.state.selected.albums.length > 0 &&
          this.state.selected.albums.map( album => {
            return (
              <Card key={ album.id }>
                <Card.Body>
                  <Grid.Row>
                    <Grid.Col width={ 2 }>
                      <Image 
                        url    = { album.images[ 0 ].url }
                      />
                      <Table
                        id      = { `album-info-${ album.id }` }
                        headers = { [] }
                        style   = {{ textAlign: 'center' }}
                        rows    = { [
                          [
                            {
                              path: `/album/${ album.id }`,
                              value: album.name,
                              state: { album, artist: this.state.selected }
                            }
                          ],
                          [ album.label ], 
                          [ `Released: ${ new Date( album.release_date ).toDateString() }` ]
                        ] }
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <IndvStats
                        elementId = { `bar-stats-${ album.id }` }
                        tracks    = { album.tracks }
                        keys      = { this.state.keys }
                        labels    = { this.state.labels }
                        handler   = { this.handleGraph.bind( this ) }
                        id        = { this.state.id }
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <TimeGraph
                        elementId = { `line-stats-${ album.id }` }
                        tracks    = { album.tracks }
                        keys      = { this.state.keys }
                        labels    = { this.state.labels }
                        handler   = { this.handleGraph.bind( this ) }
                        id        = { this.state.id }
                      />
                    </Grid.Col>
                  </Grid.Row>
                </Card.Body>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

module.exports = Artist;
