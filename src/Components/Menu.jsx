'use strict'
// Basic node information and utils
var React = require('react')

class Menu extends React.Component {
  onClick = (item) => {
    this.props.onRequest('menu:select', item)
  }

  render() {
    let selected = this.props.menu.selected
    let menu = this.props.menu[this.props.stats.status]
    if (!menu)
      menu = [selected]

    let items = []
    for(let item of menu){
      let classes = `menu-item ${(item==selected)? 'menu-selected': ''}`
      items.push(
        <button 
          className={classes}
          onClick={this.onClick.bind(this, item)} 
          key={item}>
          {item}
        </button>
      )
    }

    return (
      <div id="menu">
        {items}
      </div>
    )
  }
}

module.exports = Menu
