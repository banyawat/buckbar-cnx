import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

const editorDefaultProps = {
  mode: 'javascript',
  theme: 'monokai',
  width: '100%',
  fontSize: 18
}

export default class Editor extends Component {
  componentDidMount () {
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/monokai')
  }

  render() {
    return (
      <AceEditor 
        {...editorDefaultProps}
        {...this.props}
      />
    )
  }
}
