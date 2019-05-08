const React = require('react');

const SearchBy = ( props ) => {
  let current = props.initialVal || '';

  return (
    <select
      className = 'custom-select'
      id        = 'search-by-select'
      onChange  = { props.onChange }
      value     = { current }
    >
      <option value=''>Search By</option>
      {
        props.options.map( option => {
          return (
            <option value={ option.value } key={ option.value }>{ option.display }</option>
          );
        })
      }
    </select>
  );
};

module.exports = SearchBy;
