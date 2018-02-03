'use strict'
// Basic node information and utils
const React = require('react')


class Publish extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.initialState()
  }

  initialState() {
    return {
      topic: '',
      message: ''
    }
  }

  onTopicChange = (e) => {
    this.setState({ topic: e.target.value })
  }

  onMessageChange = (e) => {
    this.setState({ message: e.target.value })
  }

  onPublish = (e) => {
    this.props.onRequest('pubsub:publish', {
      topic: this.state.topic,
      message: this.state.message
    })
    this.setState(this.initialState())
  }

  render() {
    return (
      <article id="Publish-PubSub">
        <h4>Publish</h4>

        <div className="option-group">
          <div className="label">Publish a message to a topic</div>
          <input placeholder="topic" 
            style={{width: "18%"}}
            value={this.state.topic}
            onChange={this.onTopicChange} />
          <input placeholder="message" 
            style={{width: "60%"}}
            value={this.state.message} 
            onChange={this.onMessageChange} />
          <button className="btn btn-default" 
            style={{width: "18%"}}
            onClick={this.onPublish}>publish</button>
        </div>
      </article>
    )
  }
}

module.exports = Publish
