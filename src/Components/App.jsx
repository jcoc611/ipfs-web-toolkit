'use strict'

const React = require('react')
const IPFS = require('ipfs')
const PeerId = require('peer-id')
const PeerInfo = require('peer-info')

const Toolbox = require('./Toolbox.jsx')
const Sidebar = require('./Sidebar.jsx')

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      stats: {
        status: 'offline'
      },
      ipfsData: {}
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
      default:
        console.error(`${req}? No clue how to do that.`)
    }
  }

  startIPFS(config) {
    console.log('startIPFS w', config)
    
    config.repo = `ipfs-web-toolkit-${Date.now()}-${Math.random()}`
    this.ipfs = new IPFS(config)
    console.log('$IPFS', this.ipfs)

    // Node is ready to use when you first create it
    this.ipfs.on('ready', () => {
      this.setStatus('online')
      this.ipfs.config.get((err, c) => {
        if (err) {
          return console.error(err)
        }
        this.setState({
          ipfsData:{ config: c }
        })
      })
    })

    // Node has hit some error while initing/starting
    this.ipfs.on('error', (err) => {
      this.setStateError(err)
      console.error(err)
    })

    // Node has stopped
    this.ipfs.on('stop', () => {
      this.setStatus('offline')
    })

    this.setStatus('connecting')
  }

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


  setStatus(s) {
    this.setState({ stats: {
        status: s
    }})
  }

  setStateError(err) {
    this.setState({ stats: {
        status: 'error', error: err
    }})
  }
}

module.exports = App
