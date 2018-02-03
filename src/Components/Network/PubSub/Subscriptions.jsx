'use strict'
// Basic node information and utils
const React = require('react')


class Subscriptions extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = this.initialState()
  }

  initialState() {
    return {
      topic: '',
    }
  }

  onTopicChange = (e) => {
    this.setState({ topic: e.target.value })
  }

  onSubscribe = (e) => {
    this.props.onRequest('pubsub:subscribe', 
      this.state.topic
    )
    this.setState(this.initialState())
  }

  render() {
    // TODO add way to remove sub
    let data = this.props.ipfsData.pubsub

    let subEls = []
    for (let sub of Object.values(data.subscriptions)) {
      subEls.push(
        <div className="sub-topic" key={sub.topic}>{sub.topic}</div>
      )
    }


    return (
      <article id="Subscriptions">
        <h4>Subscriptions</h4>

        <div className="option-group">
          <div className="label">Subscribe to a topic</div>
          <input placeholder="topic" 
            style={{width: "80%"}}
            value={this.state.topic}
            onChange={this.onTopicChange} />
          <button className="btn btn-default" 
            style={{width: "18%"}}
            onClick={this.onSubscribe}>subscribe</button>
        </div>

        <div className="sub-group">
          {subEls}
        </div>
      </article>
    )
  }
}

module.exports = Subscriptions
