'use strict'
// Basic node information and utils
const React = require('react')

const Swarm = require('./Swarm')
const PubSub = require('./PubSub')
const LibP2P = require('./LibP2P')

class Section extends React.Component {
  render() {
    return (
      <section>
        <h2>Network</h2>
          <Swarm
            onRequest={this.props.onRequest}
            ipfsData={this.props.ipfsData}
            stats={this.props.stats} />
          <PubSub
            onRequest={this.props.onRequest}
            ipfsData={this.props.ipfsData}
            stats={this.props.stats} />
          <LibP2P
            onRequest={this.props.onRequest}
            ipfsData={this.props.ipfsData}
            stats={this.props.stats} />
      </section>
    )
  }
}

module.exports = Section
