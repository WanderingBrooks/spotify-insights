const React = require("react");
const RRD   = require('react-router-dom');
const Main  = require('./components/Main');
const Home  = require('./components/Home');

class App extends React.Component {
  render() {
    // <RRD.Redirect to="/" />
    return (
      <div>
        <RRD.Switch>
          <RRD.Route exact path = "/" component = { Home } />
          <RRD.Route
            path   = "/album/:id"
            render = { ( props ) => <Main { ...props } searchBy = { "album" } /> }
          />
          <RRD.Redirect to="/" />
        </RRD.Switch>
      </div>
    );
  }
}

module.exports = App;
