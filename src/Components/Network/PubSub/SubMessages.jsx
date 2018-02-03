'use strict'
// Basic node information and utils
const React = require('react')


class SubMessages extends React.Component {
  render() {
    let data = this.props.ipfsData.pubsub

    let subEls = []
    for (let sub of Object.values(data.subscriptions)) {
      let msgEls = []
      
      for (let msg of sub.messages) {
        // { from: string, data: string, topics: [string] }
        msgEls.push(
          <div className="sub-msg" key={0}>
            <span className="sub-msg-from">{msg.from}</span>
            <span className="sub-msg-data">{msg.data}</span>
          </div>
        )
      }

      subEls.push(
        <div className="sub-msg-group" key={sub.topic}>
          <div className="sub-topic">{sub.topic}</div>
          {msgEls}
        </div>
      )
    }


    return (
      <article id="SubMessages">
        <h4>Subscription Messages</h4>

        <div className="sub-msg-groups">
          {subEls}
        </div>
      </article>
    )
  }
}

module.exports = SubMessages
