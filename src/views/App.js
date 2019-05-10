const React  = require('react');
const RRD    = require('react-router-dom');
const Album  = require('./pages/Album');
const Artist = require('./pages/Artist');
const Home   = require('./pages/Home');

class App extends React.Component {
  render() {
    return (
      <RRD.Switch>
        <RRD.Route
          exact
          path   = '/'
          render = { ( props ) => <Home { ...props } initSearch = { 'album' } /> }
        />
        <RRD.Route
          path   = '/album/:id'
          render = { ( props ) => <Album { ...props } searchBy = { 'album' } /> }
        />
        <RRD.Route
          path   = '/artist/:id'
          render = { ( props ) => <Artist { ...props } searchBy = { 'artist' } /> }
        />
        <RRD.Redirect to='/' />
      </RRD.Switch>
    );
  }
}

module.exports = App;
