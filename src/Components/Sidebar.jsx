'use strict'
// Basic node information and utils
var React = require('react')

class Sidebar extends React.Component {
  render() {
    let items = []
    for(let key in this.props.stats){
      let value = this.props.stats[key]

      // Value conversion
      if (value instanceof Set) value = value.size
      if (Array.isArray(value)) value = value.length

      items.push(
        <div className="item" key={key}>
          <span className="title">{key}</span>
          <span className="value">{value}</span>
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
