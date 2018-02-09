'use strict'
// Basic node information and utils
const React = require('react')
const Config = require('./Config.jsx')
const Connect = require('./Connect.jsx')

class Section extends React.Component {
  render() {
    return (
      <section>
        <h2>Setup</h2>
        <Connect 
          onRequest={this.props.onRequest} 
          stats={this.props.stats}
          />
        <Config
          stats={this.props.stats}
          config={this.props.ipfsData.config} />
      </section>
    )
  }
}

module.exports = Section
