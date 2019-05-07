const React             = require("react");
const ReactDOM          = require('react-dom');
const { BrowserRouter } = require('react-router-dom');
const App               = require('./App');

import 'tabler-react/dist/Tabler.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));
