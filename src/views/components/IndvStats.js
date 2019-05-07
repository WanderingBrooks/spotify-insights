const React = require('react');
const Graph = require('./Graph');

class IndvStats extends React.Component {
  constructor( props ) {
    super( props );
    
    this.state = {
      sharedAttributes: {
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    }
  }

  averageStats() {
    const stats = new Array( this.props.keys.length ).fill( 0 )

    for ( let i = 0; i < this.props.keys.length; i++ ) {
      for ( let track of this.props.tracks ) {
        stats[ i ] += track[ this.props.keys[ i ] ];
      }
    }

    return stats.map( ( stat ) => ( stat / this.props.tracks.length ).toFixed( 3 ) );
  }

  generateCFG( stats ) {
    return {
      type: 'bar',
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: 'All tracks',
            data: stats,
            ...this.state.sharedAttributes
          },
          ...this.props.tracks.map( track => {
            return {
              label: track.name,
              data: this.props.keys.map( key => track[ key ].toFixed( 3 ) ),
              hidden: true,
              ...this.state.sharedAttributes
            }
          })
        ]
      },
      options: {
        animation: {
          duration: 1000
        },
        legend: {
          display: false
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
            display: true,
            ticks: {
                beginAtZero: true,
                max:         1.0
              }
          }]
        },
        title: {
          text: 'Average Track Stats',
          display: true
        },
        maintainAspectRatio: false,
      }
    }
  }

  render() {
    return (
      <Graph
        generateStats = { this.averageStats.bind( this ) }
        generateCFG   = { this.generateCFG.bind( this ) }
        elementId     = { this.props.elementId }
        handler       = { this.props.handler }
        id            = { this.props.id }
        tracks        = { this.props.tracks }
      />
    );
  }
}

module.exports = IndvStats;
