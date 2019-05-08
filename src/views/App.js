const React = require('react');
const RRD   = require('react-router-dom');
const Main  = require('./components/Main');
const Home  = require('./components/Home');

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
          render = { ( props ) => <Main { ...props } searchBy = { 'album' } /> }
        />
        <RRD.Redirect to='/' />
      </RRD.Switch>
    );
  }
}

module.exports = App;
