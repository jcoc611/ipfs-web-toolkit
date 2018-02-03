'use strict'
// Basic node information and utils
const React = require('react')
const SwarmPeers = require('./SwarmPeers.jsx')

class Swarm extends React.Component {
  render() {
    return (
      <article id="Swarm">
        <h3>Swarm</h3>

        <SwarmPeers onRequest={this.props.onRequest}
            ipfsData={this.props.ipfsData}
            stats={this.props.stats} />
        
      </article>
    )
  }
}

module.exports = Swarm
