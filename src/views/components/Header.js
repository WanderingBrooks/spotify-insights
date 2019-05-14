const React    = require('react');
const Search   = require('./Search');
const SearchBy = require('./SearchBy');

import { Card, Grid } from 'tabler-react';

const Header = ( props ) => {
  return (
    <Card>
      <Card.Body>
        <Grid.Row>
          <Grid.Col width={ 2 }>
            <SearchBy
              onChange   = { props.handleSearchBy }
              initialVal = { props.searchBy }
              options    = { [
                { value: 'album', display: 'Album' },
                { value: 'artist', display: 'Artist' }
              ] }
            />
          </Grid.Col>

          <Grid.Col>
            <Search
              handler     = { props.handleItemChange }
              selected    = { props.selected }
              searchBy    = { props.searchBy }
            />
          </Grid.Col>
        </Grid.Row>
      </Card.Body>
    </Card>
  );
}

module.exports = Header;
