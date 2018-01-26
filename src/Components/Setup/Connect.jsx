'use strict'
// Basic node information and utils
const React = require('react')

const defaultSettings = require('../../data/defaultConfig.json')

class Connect extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      config: JSON.stringify(defaultSettings, null, 4)
    }
  }

  onConnectClick = (e) => {
    this.props.onRequest('connect', JSON.parse(this.state.config))
  }

  onDisconnectClick = (e) => {
    this.props.onRequest('disconnect')
  }

  updateConfig(e) {
    this.setState({
      config: e.target.value
    })
  }

  render() {
    let actionBtn
    if (this.props.stats.status === 'offline') {
      actionBtn = <button className="btn btn-default" 
        onClick={this.onConnectClick}>connect</button>
    } else if (this.props.stats.status === 'online') {
      actionBtn = <button className="btn btn-default" 
        onClick={this.onDisconnectClick}>disconnect</button>
    } else {
      actionBtn = <button className="btn" disabled>
        {this.props.stats.status}</button>
    }


    return (
      <article id="Connect">
        <h3>Connect</h3>
        <div className="option-group">
          <div className="label">Instance Options</div>
          <textarea value={this.state.config} 
            disabled={this.props.stats.status !== 'offline'}
            onChange={this.updateConfig} />
        </div>
        {actionBtn}
      </article>
    )
  }
}

module.exports = Connect
