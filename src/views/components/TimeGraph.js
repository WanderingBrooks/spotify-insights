const React = require('react');
const Graph = require('./Graph');

class LineGraph extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      lineColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ],
      lineBorderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      sharedAttributes: {
        fill: false,
        borderWidth: 1,
      }
    }
  }

  generateCFG() {
    return {
      type: 'line',
      data: {
        labels: this.props.tracks.map( ( t ) => t.name ),
        datasets: [
          ...this.props.keys.map( ( key, index ) => {
            return {
              label: this.props.labels[ index ],
              data: this.props.tracks.map( track => track[ key ].toFixed( 3 ) ),
              hidden: index > 0 ? true : false,
              backgroundColor: this.state.lineColor[ index ],
              borderColor: this.state.lineBorderColor[ index ],
              ...this.state.sharedAttributes
            }
          })
        ]
      },
      options: {
        animation: {
          duration: 1000
        },
        scales: {
          yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true,
                  max:         1.0
                }
            }],
            xAxes: [{
              display: false
            }]
        },
        legend: {
          position: 'bottom'
        },
        title: {
          text: 'Stats Per Track',
          display: true
        },
        maintainAspectRatio: false,
      }
    }
  }

  render() {
    return (
      <Graph
        generateStats = { x => x }
        generateCFG   = { this.generateCFG.bind( this ) }
        elementId     = { this.props.elementId }
        handler       = { this.props.handler }
        id            = { this.props.id }
        tracks        = { this.props.tracks }
      />
    );
  }
}

module.exports = LineGraph;
