const React     = require('react');
const RRD       = require('react-router-dom');
const Main      = require('../components/Main');
const IndvStats = require('../components/IndvStats');
const TimeGraph = require('../components/TimeGraph');
const Image     = require('../components/Image');
const Table     = require('../components/Table');
const Header    = require('../components/Header');

import { Card, Grid, Loader } from 'tabler-react';

class Album extends Main {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div>
         <Header
          handleSearchBy   = { this.handleSearchBy.bind( this ) }
          handleItemChange = { this.handleItemChange.bind( this ) }
          searchBy         = { this.state.searchBy }
          selected         = { this.state.selected }
        />

        {
          this.state.selected &&
          <div className='main-header'>
            <RRD.Link
              to={{
                pathname: `/artist/${ this.state.selected.artists[ 0 ].id }`,
                state:    { artist: this.props.location.state && this.props.location.state.artist } 
              }}
              onClick={() => document.body.scrollTop = document.documentElement.scrollTop = 0}
            >
              <span>
                { this.state.selected.artists[ 0 ].name }
              </span>
            </RRD.Link>
          </div>
        }

        {
          !this.state.selected && <Loader />
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
                      [ this.state.selected.name ],
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
