'use strict'
// Basic node information and utils
const React = require('react')

class PeerDial extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      protocol: '',
      peerId: ''
    }
  }

  onProtocolChange = (e) => {
    this.setState({ protocol: e.target.value })
  }

  onPeerIdChange = (e) => {
    this.setState({ peerId: e.target.value })
  }

  onDial = (e) => {
    this.props.onRequest('libp2p:dial', {
      protocol: this.state.protocol,
      peerId: this.state.peerId
    })
  }

  onHangUp = (e) => {
    this.props.onRequest('libp2p:hangUp')
  }

  render() {
    let data = this.props.ipfsData.libp2p

    let actionBtn
    if (data.dialStatus === 'hanged up') {
      actionBtn = <button className="btn btn-default" style={{width: "18%"}}
        onClick={this.onDial}>dial</button>
    } else if (data.dialStatus === 'connected') {
      actionBtn = <button className="btn btn-default" style={{width: "18%"}}
        onClick={this.onHangUp}>hang up</button>
    } else {
      actionBtn = <button className="btn" disabled style={{width: "18%"}}>
        {data.dialStatus}</button>
    }

    return (
      <div id="PeerDial">
        <h4>Dial a Peer</h4>
        <div className="option-group">
          <div className="label">Call a libp2p peer on any given protocol</div>
          <input placeholder="protocol (i.e. /echo/1.0.0)" 
            style={{width: "18%"}}
            value={this.state.protocol}
            onChange={this.onProtocolChange} />
          <input placeholder="PeerId" 
            style={{width: "60%"}}
            value={this.state.peerId} 
            onChange={this.onPeerIdChange} />
          {actionBtn}
        </div>
      </div>
    )
  }
}

module.exports = PeerDial
