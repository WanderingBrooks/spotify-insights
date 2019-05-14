const React  = require('react');
const Header = require('../components/Header');

class Home extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      searchBy: props.initSearch,
      selected: props.history.state,
    };
  }

  handleItemChange( selected ) {
    this.props.history.push( `${ this.state.searchBy }/${ selected }` );
  }

  handleSearchBy( e ) {
    this.setState({ searchBy: e.target.value });
  }

  render() {
    return (
      <Header
        handleSearchBy   = { this.handleSearchBy.bind( this ) }
        handleItemChange = { this.handleItemChange.bind( this ) }
        searchBy         = { this.state.searchBy }
        selected         = { this.state.selected }
      />
    );
  }
}

module.exports = Home;
