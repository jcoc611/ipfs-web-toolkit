'use strict'
// Basic node information and utils
var React = require('react')

class Sidebar extends React.Component {
  render() {
    let items = []
    for(let key in this.props.stats){
      items.push(
        <div className="item" key={key}>
          <span className="title">{key}</span>
          <span className="value">{this.props.stats[key]}</span>
        </div>
      )
    }

    return (
      <div id="sidebar">
        <h3>Stats</h3>
        {items}
      </div>
    )
  }
}

module.exports = Sidebar
