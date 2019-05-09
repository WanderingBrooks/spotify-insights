const React     = require('react');
const Search    = require('./Search');
const IndvStats = require('./IndvStats');
const TimeGraph = require('./TimeGraph');
const Image     = require('./Image');
const Table     = require('./Table');
const SearchBy  = require('./SearchBy');
const qs        = require('querystring');

import { Card, Grid } from 'tabler-react';

class Main extends React.Component {
  constructor( props ) {
    super( props );

    const keys = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness'
    ];

    this.state = {
      searchBy: props.searchBy,
      id:       null,
      selected: null,
      graphs:   {},
      labels:   keys.map( key => `${ key.charAt( 0 ).toUpperCase() }${ key.slice( 1 ) }` ),
      keys
    };
  }

  componentWillReceiveProps( nextProps ) {
    if ( this.state.id !== nextProps.id ) {
      this.destroyGraphs();
      this.fetchItemWithFeatures( nextProps.match.params.id );
    }
  }

  componentWillMount() {
    if ( !this.state.selected ) {
      this.fetchItemWithFeatures( this.props.match.params.id );
    }
  }

  fetchItemWithFeatures( id ) {
    axios.get(`/api/${ this.props.searchBy }/${ id }`)
      .then( ({ data }) => this.setState({ id, selected: data }) )
      .catch( console.error );
  }

  handleGraph( graph, id ) {
    this.state.graphs[ id ] = graph;
    this.forceUpdate();
  }

  destroyGraphs() {
    Object.values( this.state.graphs ).forEach( graph => graph.destroy() );
  }

  handleItemChange( id ) {
    const searchBy = this.state.searchBy && !this.props.searchBy ? `${ this.state.searchBy }/` : '';
    this.props.history.push( `${ searchBy }${ id }`, this.state.selected );
  }

  handleSearchBy( e ) {
    this.setState({ searchBy: e.target.value });
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
                  options    = { [{ value: 'album', display: 'Album' }] }
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
                  rows    = { this.state.selected.tracks.map( track => [ track.name ] ) }
                />
              </Grid.Col>
            </Card.Body>
          </Card>
        }
      </div>
    );
  }
}

module.exports = Main;
