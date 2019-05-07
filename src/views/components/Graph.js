const React = require('react');
const Chart = require('chart.js');

class Graph extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.calcAndDraw();
  }

  componentWillReceiveProps( nextProps ) {
    const shouldRedraw = (
      nextProps.id !== this.props.id ||
      nextProps.tracks.length !== this.props.tracks.length
    );

    if ( shouldRedraw ) {
      this.calcAndDraw();
    }
  }

  calcAndDraw() {
    const stats = this.props.generateStats();
    this.drawGraph( stats );
  }

  drawGraph( stats ) {
    const graph = new Chart(
      document.getElementById( this.props.elementId ),
      this.props.generateCFG( stats )
    );

    this.props.handler( graph, this.props.elementId );
  }

  render() {
    return (
      <canvas
        id     = { this.props.elementId }
        width  = '400'
        height = '400'
      />
    );
  }
}

module.exports = Graph;
