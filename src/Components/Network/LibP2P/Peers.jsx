'use strict'
// Basic node information and utils
var React = require('react')

class Peers extends React.Component {
  render() {
    let items = []
    for(let peer of this.props.stats.peersConnected){
      items.push(
        <div className="peer" key={peer}>
          {peer}
        </div>
      )
    }

    return (
      <div id="Peers">
        <h4>Peers</h4>
        <div className="option-group">
          <div className="label">Peers connected to this instance</div>
          <div className="text-content">
            {items}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Peers
