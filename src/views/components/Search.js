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
        value: item.id
      };
    });
  };

  getOptions( input ) {
    return new Promise( resolve => {
      if ( input ) {
        axios.get(`/api/${ this.props.searchBy }?${ qs.stringify({ title: input })}`)
          .then( ({ data }) => {
            resolve( this.formatOptions( data[`${ this.props.searchBy }s`].items ) );
          });
      }
      else {
        resolve( this.formatOptions( this.state.results ) );
      }
    });
  }

  handleChange({ value }) {
    this.props.handler( value );
  }

  render() {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions = { this.getOptions.bind( this ) }
        onChange    = { this.handleChange.bind( this ) }
        isDisabled  = { !this.props.searchBy }
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
