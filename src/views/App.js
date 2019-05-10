const React  = require('react');
const RRD    = require('react-router-dom');
const Album  = require('./components/Album');
const Artist = require('./components/Artist');
const Home   = require('./components/Home');

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
