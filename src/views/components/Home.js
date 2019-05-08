const React    = require('react');
const Search   = require('./Search');
const SearchBy = require('./SearchBy');

import { Card, Grid } from 'tabler-react';

class Home extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      searchBy: props.initSearch,
      selected: props.history.state,
    };
  }

  handleSelected( selected ) {
    this.props.history.push( `${ this.state.searchBy }/${ selected }` );
  }

  handleSearchBy( e ) {
    this.setState({ searchBy: e.target.value });
  }

  render() {
    return (
        <Card>
          <Card.Body>
            <Grid.Row>
              <Grid.Col width={ 2 }>
                <SearchBy
                  onChange   = { this.handleSearchBy.bind( this ) }
                  options    = { [{ value: 'album', display: 'Album', selected: 'selected' }] }
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
    );
  }
}

module.exports = Home;
