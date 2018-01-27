'use strict'
// Basic node information and utils
const React = require('react')
const Peers = require('./Peers.jsx')
const PeerDial = require('./PeerDial.jsx')
const PeerChat = require('./PeerChat.jsx')

class LibP2P extends React.Component {
  render() {
    return (
      <article id="LibP2P">
        <h3>LibP2P</h3>

        <Peers stats={this.props.stats} />
        <PeerDial stats={this.props.stats}
          ipfsData={this.props.ipfsData}
          onRequest={this.props.onRequest} />
        <PeerChat stats={this.props.stats}
          ipfsData={this.props.ipfsData}
          onRequest={this.props.onRequest} />
      </article>
    )
  }
}

module.exports = LibP2P
