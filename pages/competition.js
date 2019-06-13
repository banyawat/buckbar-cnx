import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const code = `function add(a, b) {
  return a + b;
}
`

const DynamicComponent = dynamic(() => import('react-ace'),
{
  ssr: false
})

export default class competition extends Component {
  state = {
    code,
  }

  componentDidMount() {
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/github')
  }

  render() {
    return (
      <div>
        Editor
        <DynamicComponent
          mode="javascript"
          theme="github"
          onChange={() => {
            console.log('test')
          }}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
      </div>
    )
  }
}
