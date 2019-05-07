const React = require('react');
const qs    = require('querystring');

import AsyncSelect from 'react-select/lib/Async';

class Search extends React.Component {
  constructor( props ) {
    super( props );
  }

  formatOptions( options ) { 
    return options.map(( item, index ) => {
      return {
        label: `${ item.artists.map( ({ name }) => name ) }: ${ item.name }`,
        value: index,
        original: item
      };
    });
  };

  getOptions( input ) {
    return new Promise( resolve => {
      if ( input ) {
        axios.get(`/api/${ this.props.searchBy }?${ qs.stringify({ title: input })}`)
          .then( ({ data }) => {
            resolve( this.formatOptions( data.albums.items ) );
          });
      }
      else {
        resolve( this.formatOptions( this.state.results ) );
      }
    });
  }

  handleChange({ original }) {
    this.props.handler( original );
  }

  render() {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions = { this.getOptions.bind( this ) }
        onChange    = { this.handleChange.bind( this ) }
        isDisabled  = { !this.props.searchBy }
        isClearable = { true }
        value       = { 
          this.props.selected
            ? this.formatOptions([ this.props.selected ])
            : null
          }
      />
    );
  }
}

module.exports = Search;
