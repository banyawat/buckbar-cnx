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
  fontSize: 18,
  editorProps: {
    $blockScrolling: true
  }
}

export default class Editor extends Component {
  render() {
    return (
      <AceEditor 
        {...editorDefaultProps}
        {...this.props}
      />
    )
  }
}
