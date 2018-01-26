'use strict'
// Basic node information and utils
const React = require('react')

class Config extends React.Component {
  render() {
    return (
      <article id="Config">
        <h3>Config</h3>
        <div className="option-group">
          <div className="label">Instance Options</div>
          <div className="text-content">
            {JSON.stringify(this.props.config, null, 4)}
          </div>
        </div>
      </article>
    )
  }
}

module.exports = Config
