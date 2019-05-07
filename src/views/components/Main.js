const React     = require("react");
const Search    = require('./Search');
const IndvStats = require('./IndvStats');
const TimeGraph = require('./TimeGraph');
const Image     = require('./Image');
const Table     = require('./Table');
const SearchBy  = require('./SearchBy');
const qs        = require('querystring');

import { Card, Grid } from "tabler-react";

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
      searchBy: this.props.searchBy,
      selected: props.history.location.state,
      tracks:   [],
      graphs:   {},
      labels:   keys.map( key => `${ key.charAt( 0 ).toUpperCase() }${ key.slice( 1 ) }` ),
      keys
    };
  }

  componentWillReceiveProps( nextProps ) {
    const selected = nextProps.history.location.state;
    this.fetchFeatures( selected );
  }

  componentWillMount() {
    if ( this.state.selected ) {
      this.fetchFeatures( this.state.selected );
    }
  }

  fetchFeatures( selected ) {
    axios.get(`/api/album/features?${ qs.stringify({ id: selected.id }) }`)
      .then( ({ data }) => this.setState({ selected, tracks: data }) )
      .catch( console.error );
  }

  handleGraph( graph, id ) {
    this.state.graphs[ id ] = graph;
    this.forceUpdate();
  }

  handleSelected( selected ) {
    const searchBy = this.state.searchBy && !this.props.searchBy ? `${ this.state.searchBy }/` : '';
    Object.values( this.state.graphs ).forEach( graph => graph.destroy() );
    this.props.history.push( `${ searchBy }${ selected.id }`, selected );
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
                  handler  = { this.handleSelected.bind( this ) }
                  selected = { this.state.selected }
                  searchBy = { this.state.searchBy }
                />
              </Grid.Col>
            </Grid.Row>
          </Card.Body>
        </Card>

        {
          this.state.tracks &&
          this.state.selected &&
          this.state.selected.images.length > 0 &&
          <Card>
            <Card.Body>
              <Grid.Row>
                <Grid.Col width={ 2 }>
                  <Image 
                    url    = { this.state.selected.images[ 0 ].url }
                    width  = '200px'
                    height = '200px'
                  ></Image>
                </Grid.Col>
                <Grid.Col width={ 4 }>
                  <IndvStats
                    elementId = { 'bar-stats' }
                    tracks    = { this.state.tracks }
                    keys      = { this.state.keys }
                    labels    = { this.state.labels }
                    handler   = { this.handleGraph.bind( this ) }
                    id        = { this.state.selected.id }
                  ></IndvStats>
                </Grid.Col>
                <Grid.Col width={ 5 }>
                  <TimeGraph
                    elementId = { 'line-stats' }
                    tracks    = { this.state.tracks }
                    keys      = { this.state.keys }
                    labels    = { this.state.labels }
                    handler   = { this.handleGraph.bind( this ) }
                    id        = { this.state.selected.id }
                  ></TimeGraph>
                </Grid.Col>
              </Grid.Row>
            </Card.Body>
          </Card>
        }

        {
          this.state.tracks.length > 0 &&
          <Card>
            <Card.Body>
              <Grid.Col>
                <Table
                  tracks = { this.state.tracks }
                ></Table>
              </Grid.Col>
            </Card.Body>
          </Card>
        }
      </div>
    );
  }
}

module.exports = Main;
