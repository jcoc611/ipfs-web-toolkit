'use strict'
// Basic node information and utils
var React = require('react')

class PeerFind extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      peerId: ''
    }
  }

  onPeerIdChange = (e) => {
    this.setState({ peerId: e.target.value })
  }

  findPeer = (e) => {
    this.props.onRequest('libp2p:findPeer', this.state.peerId)
  }

  render() {
    let data = this.props.ipfsData.libp2p

    return (
      <div id="PeerFind">
        <h4>Find a Peer</h4>
        <div className="option-group">
          <div className="label">Peer ID</div>
          <input placeholder="Peer ID" 
            style={{width: "80%"}}
            value={this.state.peerId}
            onChange={this.onPeerIdChange} />
          <button onClick={this.findPeer}
            style={{width: "18%"}}>find</button>
        </div>
        <div>{data.peerFound}</div>
      </div>
    )
  }
}

module.exports = PeerFind
