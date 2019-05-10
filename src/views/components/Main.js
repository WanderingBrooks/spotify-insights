const React = require('react');

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
      selected: props.location.state && props.location.state[ props.searchBy ],
      graphs:   {},
      keys:     [ ...keys, 'valence' ],
      labels:   [
        ...keys.map( key => `${ key.charAt( 0 ).toUpperCase() }${ key.slice( 1 ) }` ),
        'Positiveness'
      ]
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
    axios.get( `/api/${ this.props.searchBy }/${ id }` )
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
    const searchBy = this.state.searchBy ? `/${ this.state.searchBy }/` : '';
    this.props.history.push( `${ searchBy }${ id }`, this.state.selected );
  }

  handleSearchBy( e ) {
    this.setState({ searchBy: e.target.value });
  }

  render() {
    throw new Error('Subclasses must define a render');
  }
}

module.exports = Main;
