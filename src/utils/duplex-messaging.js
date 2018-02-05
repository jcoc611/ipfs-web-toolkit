'use strict'

class DuplexMessaging {
  constructor() {
    this._cb = null
    this.queue = []

    this.listeners = []
  }

  source = (end, cb) => {
    if(end) return cb(end)

    if(this.queue.length)
      cb(null, this.queue.pop())
    else
      this._cb = cb
  }

  sink = (read, cb) => {
    let next = (end, buff) => {
      if(end === true) return
      if(end) throw end

      // =
      this.onMessage(buff.toString())
      // =

      read(null, next)
    }
    
    read(null, next)
  }

  send(msg) {
    if (this._cb) {
      this._cb(null, msg)
      this._cb = null
    } else { 
      this.queue.push(msg)
    }
  }

  receive(cb) {
    this.listeners.push(cb)
  }

  onMessage(msg) {
    for (let listener of this.listeners) {
      listener(msg)
    }
  }
}

module.exports = DuplexMessaging
