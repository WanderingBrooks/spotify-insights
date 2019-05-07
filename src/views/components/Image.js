const React = require('react');

const Image = ( props ) => {
  return (
    <img
      src    = { props.url }
      width  = { props.width }
      height = { props.height }
    ></img>
  );
};

module.exports = Image;
