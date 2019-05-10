const React = require('react');
const qs    = require('querystring');

import AsyncSelect from 'react-select/lib/Async';

class Search extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      previousSearchBy: this.props.searchBy,
      labelFormatters: {
        artist: ({ name }) => `${ name }`,
        album:  ( item ) => {
          const artists = item.artists && item.artists.map( ({ name }) => name );
          return `${ artists ? `${ artists }: ` : '' }${ item.name }`
        }
      }
    }
  }
  
  componentWillReceiveProps() {
    // Set it to the current one before we update
    this.setState({ previousSearchBy: this.props.searchBy });
  }

  formatOptions( options ) {
    let formatter = this.state.labelFormatters[ this.props.searchBy ];

    if ( this.props.searchBy !== this.state.previousSearchBy && options.length === 1 ) {
      formatter = this.state.labelFormatters[ this.state.previousSearchBy ];
    }

    return options.map(( item ) => {
      return {
        label: formatter( item ),
        value: item.id
      };
    });
  };

  getOptions( input ) {
    return new Promise( resolve => {
      if ( input ) {
        axios.get(`/api/${ this.props.searchBy }?${ qs.stringify({ q: input })}`)
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
