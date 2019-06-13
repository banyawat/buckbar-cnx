import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const Console = dynamic(() => import('console-feed').then(Comp => Comp.Console),
{
  ssr: false
})

class CustomConsole extends Component {
  state = {
    logs: []
  }

  componentDidMount() {
    const { Hook, Decode } = require('console-feed')
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })

    console.log(`Hello world!`)
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console logs={this.state.logs} variant="dark" />
      </div>
    )
  }
}

export default CustomConsole