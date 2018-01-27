'use strict'
// All the tools in the toolbox
const React = require('react')

const Setup = require('./Setup')
const Network = require('./Network')

class Toolbox extends React.Component {
  render(){
    return (
      <div id="toolbox">
        <h1>IPFS Toolbox</h1>
        <section>
          <h2>Setup</h2>
          <Setup.Connect 
            onRequest={this.props.onRequest} 
            stats={this.props.stats}
            />
          <Setup.Config
            stats={this.props.stats}
            config={this.props.ipfsData.config} />
        </section>

        <section>
          <h2>Files</h2>
          <p className="TODO">TODO</p>
        </section>

        <section>
          <h2>Graph</h2>
          <p className="TODO">TODO</p>
        </section>

        <section>
          <h2>Network</h2>
          <Network.LibP2P
            onRequest={this.props.onRequest}
            ipfsData={this.props.ipfsData}
            stats={this.props.stats} />
        </section>
      </div>
    )
  }
}

module.exports = Toolbox
