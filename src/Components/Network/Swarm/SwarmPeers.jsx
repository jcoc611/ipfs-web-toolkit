'use strict'
// Basic node information and utils
var React = require('react')

class SwarmPeers extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.initialState()
  }

  initialState() {
    return {
      address: '',
    }
  }

  onAddressChange = (e) => {
    this.setState({ address: e.target.value })
  }

  onAdd = (e) => {
    this.props.onRequest('swarm:add', 
      this.state.address
    )
    this.setState(this.initialState())
  }

  render() {
    let items = []
    for(let peer of this.props.stats.swarmPeers){
      items.push(
        <div className="peer" key={peer.addr}>
          {peer.addr} ({peer.peer})
        </div>
      )
    }

    return (
      <div id="SwarmPeers">
        <h4>Swarm Peers</h4>

        <div className="option-group">
          <div className="label">Add a peer by address</div>
          <input placeholder="address (e.g. /ip4/127.0.0.1/tcp/1337" 
            style={{width: "80%"}}
            value={this.state.address}
            onChange={this.onAddressChange} />
          <button className="btn btn-default" 
            style={{width: "18%"}}
            onClick={this.onAdd}>add</button>
        </div>

        <div className="option-group">
          <div className="label">Peers in the swarm</div>
          <div className="text-content">
            {items}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = SwarmPeers
