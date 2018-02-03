'use strict'
// Basic node information and utils
const React = require('react')
const Publish = require('./Publish.jsx')
const SubMessages = require('./SubMessages.jsx')
const Subscriptions = require('./Subscriptions.jsx')

class PubSub extends React.Component {
  render() {
    return (
      <article id="PubSub">
        <h3>Publish/Subscribe</h3>

        <Publish onRequest={this.props.onRequest}
            ipfsData={this.props.ipfsData}
            stats={this.props.stats} />
        <Subscriptions onRequest={this.props.onRequest}
            ipfsData={this.props.ipfsData}
            stats={this.props.stats} />
        <SubMessages onRequest={this.props.onRequest}
            ipfsData={this.props.ipfsData}
            stats={this.props.stats} />
      </article>
    )
  }
}

module.exports = PubSub
