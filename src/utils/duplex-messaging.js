'use strict'

class DuplexMessaging {
  constructor() {
    this._cb = null
    this.queue = []

    this.listeners = []
  }

  source(end, cb) {
    if(end) return cb(end)

    if(queue.length)
      cb(null, this.queue.pop())
    else
      this._cb = cb
  }

  sink(read, cb) {
    read(null, function next(end, serialized) {
      if(end === true) return
      if(end) throw end

      // =
      this.onMessage(serialized)
      // =

      read(null, next)
    })
  }

  send(msg) {
    if(this._cb)
      this._cb(null, msg)
    else 
      this.queue.push(response)
  }

  receive(cb) {
    this.listeners.push(cb)
  }

  onMessage(msg) {
    for(let listener of this.listeners) {
      listener(msg)
    }
  }
}

module.exports = DuplexMessaging
