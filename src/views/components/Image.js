const React = require('react');

const Image = ( props ) => {
  return (
    <img
      src    = { props.url }
      width  = { props.width }
      height = { props.height }
      style  = { {
        display:      'block',
        marginLeft:   'auto',
        marginRight:  'auto',
        marginTop:    '20px',
        marginBottom: '20px'
      } }
    />
  );
};

module.exports = Image;
