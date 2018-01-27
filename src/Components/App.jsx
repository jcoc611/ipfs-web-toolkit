'use strict'

const IPFS = require('ipfs')
const React = require('react')
const PeerId = require('peer-id')
const pull = require('pull-stream')
const PeerInfo = require('peer-info')
const merge = require('lodash/merge')

const Messaging = require('../utils/duplex-messaging')
const Toolbox = require('./Toolbox.jsx')
const Sidebar = require('./Sidebar.jsx')

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = this.initialState()
  }

  initialState() {
    return {
      stats: {
        status: 'offline',
        peersDiscovered: new Set(),
        peersConnected: new Set(),
      },
      ipfsData: {
        libp2p: {
          dialStatus: 'hanged up',
          protocol: '',
          messages: [],
        }
      }
    }
  }

  onRequest = (req, arg) => {
    // TODO: need to extend to more args?
    switch(req) {
      case 'connect':
        this.startIPFS(arg)
        break;
      case 'disconnect':
        this.stopIPFS()
        break;

      // LibP2P
      case 'libp2p:dial':
        this.dialPeer(arg)
        break;
      case 'libp2p:hangUp':
        this.hangUp()
        break;
      case 'libp2p:send':
        this.sendToPeer(arg)
        break;
      default:
        console.error(`${req}? No clue how to do that.`)
    }
  }

  startIPFS(config) {    
    config.repo = `ipfs-web-toolkit-${Date.now()}-${Math.random()}`
    this.ipfs = new IPFS(config)

    window.ipfs = this.ipfs

    // Node is ready to use when you first create it
    this.ipfs.on('ready', () => {
      this.setStatus('online')

      // Update Config
      this.ipfs.config.get((err, c) => {
        if (err) return console.error(err)

        this.updateState('ipfsData/config', c)
      })

      // Update Peers
      this.ipfs._libp2pNode.on('peer:connect', (pInfo) => {
        this.updateState('stats/peersConnected', (s) => {
          let peersConnected = new Set(s)
          peersConnected.add(pInfo.id.toB58String())
          
          return peersConnected
        })
      })

      this.ipfs._libp2pNode.on('peer:disconnect', (pInfo) => {
        this.updateState('stats/peersConnected', (s) => {
          let peersConnected = new Set(s)
          peersConnected.delete(pInfo.id.toB58String())
          
          return peersConnected
        })
      })

      this.ipfs._libp2pNode.on('peer:discovery', (pInfo) => {
        this.updateState('stats/peersDiscovered', (s) => {
          let peersDiscovered = new Set(s)
          peersDiscovered.add(pInfo.id.toB58String())
          
          return peersDiscovered
        })
      })

      // Turn circuit on
      // TODO: this is a hack!! how do normal people enable this?
      this.ipfs._libp2pNode.swarm.connection.enableCircuitRelay({
        enabled: true,
        hop: {
          enabled: true,
          active: true,
        }
      })

      // Handle basic echo
      this.ipfs._libp2pNode.handle('/echo/1.0.0', (conn) => pull(conn, conn))
    })

    // Node has hit some error while initing/starting
    this.ipfs.on('error', (err) => {
      this.setStateError(err)
      console.error(err)
    })

    // Node has stopped
    this.ipfs.on('stop', () => {
      this.setState(this.initialState())
    })

    this.setStatus('connecting')

    console.log('Welcome to the IPFS Web Toolkit! The node is at window.ipfs')
  }

  stopIPFS() {
    if (this.status.stats.status === 'offline') return
    this.ipfs.stop()
  }

  ////////////////////////////////////
  // LibP2P
  dialPeer(options) {
    let peerId = PeerId.createFromB58String(options.peerId)
    let peerInfo = new PeerInfo(peerId)

    this.ipfs._libp2pNode.dial(peerInfo, options.protocol, (err, conn) => {
      if(err) return console.error(err)

      this.updateState('ipfsData/libp2p/dialStatus', 'connected')

      this.dialMessaging = new Messaging()

      pull(
        this.dialMessaging.source,
        conn,
        this.dialMessaging.sink
      )

      this.dialMessaging.receive((msg) => {
        this.updateState('ipfsData/libp2p/messages', (msgs) => msgs.concat({
          message: msg,
          source: 'peer'
        }))
      })
    })

    this.updateState('ipfsData/libp2p', {
      dialStatus: 'calling',
      peer: peerId.toJSON()
    })
  }

  sendToPeer(msg) {
    if(this.state.ipfsData.libp2p.dialStatus !== 'connected') return

    this.dialMessaging.send(msg)
    this.updateState('ipfsData/libp2p/messages', (msgs) => msgs.concat({
      message: msg,
      source: 'self'
    }))
  }

  hangUp() {
    if(this.state.ipfsData.libp2p.dialStatus === 'hanged up') return

    this.ipfs._libp2pNode.hangUp(
      PeerId.createFromJSON(this.state.ipfsData.libp2p.peer),
      (err) => {
        if(err) return console.log(err)
        this.updateState('ipfsData/libp2p/dialStatus', 'hanged up')
      }
    )

    this.updateState('ipfsData/libp2p', {
      dialStatus: 'hanging up',
      peer: null,
      messages: []
    })
  }

  ////////////////////////////////////
  // Utils

  updateState(newStatus, extra) {
    // updateState({})
    // updateState((oldState) => ({}))
    // updateState('prefix/asdf', {})
    // updateState('prefix/asdf', (oldState) => ({}))
    
    let prefix
    if(extra !== undefined) {
      prefix = newStatus
      newStatus = extra
    }

    let getNewState
    if (typeof(newStatus) == 'function')
      getNewState = newStatus
    else
      getNewState = (s) => (newStatus)

    if (prefix) {
      let oldf = getNewState
      if (typeof(prefix) === 'string')
        prefix = prefix.split('/')

      getNewState = (s) => {
        // s = { prefix: {asdf: ...}}
        let ns = {}, ns_i = ns
        let last = prefix.pop()
        for(let p of prefix) {
          ns_i[p] = {}
          ns_i = ns_i[p]
          s = s[p]
        }
        ns_i[last] = oldf(s[last])
        return ns
      }
    }

    this.setState((s) => merge(s, getNewState(s)))
  }

  setStatus(s) {
    this.updateState('stats/status', s)
  }

  setStateError(err) {
    this.updateState('stats', {status: 'error', error: err})
  }

  ////////////////////////////////////
  // Rendering

  render(){
    return (
      <div id="react-app">
        <Toolbox
          onRequest={this.onRequest}
          ipfsData={this.state.ipfsData}
          stats={this.state.stats}
         />
        <Sidebar stats={this.state.stats} />
      </div>
    )
  }  
}

module.exports = App
