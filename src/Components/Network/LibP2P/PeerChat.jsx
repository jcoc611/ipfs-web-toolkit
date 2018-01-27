'use strict'
// Basic node information and utils
var React = require('react')

class PeerChat extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      message: ''
    }
  }

  onMessageChange = (e) => {
    this.setState({ message: e.target.value })
  }

  onSend = (e) => {
    this.props.onRequest('libp2p:send', this.state.message)
    this.setState({ message: '' })
  }

  render() {
    let data = this.props.ipfsData.libp2p

    if (data.dialStatus !== 'connected') return null

    let items = [], i = 0
    for(let msg of data.messages){
      items.push(
        <div className="message" key={i} 
          style={{textAlign:(msg.source === 'self')?'right':'left'}}>
          {msg.message}
        </div>
      )
      i++
    }

    return (
      <div id="PeerChat">
        <h4>Peer Chat</h4>
        <div className="option-group">
          <div className="label">Chat with peer on "{data.protocol}"</div>
          <div className="text-content">
            {items}
          </div>
        </div>
        <div className="option-group">
          <input placeholder="message" 
            style={{width: "80%"}}
            value={this.state.message}
            onChange={this.onMessageChange} />
          <button className="btn btn-default" style={{width: "18%"}}
            onClick={this.onSend}>send</button>
        </div>
      </div>
    )
  }
}

module.exports = PeerChat
