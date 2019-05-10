const React = require('react');

const SearchBy = ( props ) => {
  const current = props.initialVal;

  return (
    <select
      className = 'custom-select'
      id        = 'search-by-select'
      onChange  = { props.onChange }
      value     = { current }
    >
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
