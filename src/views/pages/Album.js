const React     = require('react');
const Main      = require('../components/Main');
const Search    = require('../components/Search');
const IndvStats = require('../components/IndvStats');
const TimeGraph = require('../components/TimeGraph');
const Image     = require('../components/Image');
const Table     = require('../components/Table');
const SearchBy  = require('../components/SearchBy');

import { Card, Grid } from 'tabler-react';

class Album extends Main {
  constructor( props ) {
    super( props );
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
                  handler  = { this.handleItemChange.bind( this ) }
                  selected = { this.state.selected }
                  searchBy = { this.state.searchBy }
                />
              </Grid.Col>
            </Grid.Row>
          </Card.Body>
        </Card>

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
                      [
                        {
                          path: `/artist/${ this.state.selected.artists[ 0 ].id }`,
                          value: this.state.selected.artists[ 0 ].name,
                          state: { artist: this.props.location.state && this.props.location.state.artist }
                        }
                      ],
                      [ this.state.selected.label ], 
                      [ `Released: ${ new Date( this.state.selected.release_date ).toDateString() }` ]
                    ] }
                  />
                </Grid.Col>
                <Grid.Col>
                  <IndvStats
                    elementId = { 'bar-stats' }
                    tracks    = { this.state.selected.tracks }
                    keys      = { this.state.keys }
                    labels    = { this.state.labels }
                    handler   = { this.handleGraph.bind( this ) }
                    id        = { this.state.id }
                  />
                </Grid.Col>
                <Grid.Col>
                  <TimeGraph
                    elementId = { 'line-stats' }
                    tracks    = { this.state.selected.tracks }
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
          this.state.selected.tracks.length > 0 &&
          <Card>
            <Card.Body>
              <Grid.Col>
                <Table
                  id      = { 'tracks' }
                  headers = { [ 'Tracks' ]}
                  rows    = { this.state.selected.tracks.map( ( track, index ) => [ `${ index + 1 }: ${ track.name }` ] ) }
                />
              </Grid.Col>
            </Card.Body>
          </Card>
        }
      </div>
    );
  }
}

module.exports = Album;
