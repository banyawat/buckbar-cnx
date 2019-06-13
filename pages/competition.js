import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Row, Col } from 'antd'
import EditorLayout from '../src/Layout/EditorLayout'
import Console from '../src/components/Console'

const PREFIX = '$bugbar >'

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

export default class competition extends Component {
  state = {
    code: '',
    result: '',
    logs: [],
  }

  componentDidMount() {
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/monokai')
    const { Hook, Decode } = require('console-feed')
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
    console.log(PREFIX)
  }

  onEditorChange = (code) => {
    this.setState({
      code,
    })
  }

  onCompile = () => {
    this.setState({
      logs: [],
    })
    console.log(PREFIX)
    try {
      const result = eval(this.state.code.toString())
      this.setState({
        result,
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <EditorLayout
        onCompile={this.onCompile}
      >
        <Row gutter={4}>
          <Col span={12}>
            <AceEditor
              mode="javascript"
              theme="monokai"
              width="100%"
              height="850px"
              value={this.state.code}
              onChange={this.onEditorChange}
              name="ace-code-editor"
              editorProps={{
                $blockScrolling: true
              }}
              style={{
                fontSize: 18,
              }}
            />
          </Col>
          <Col 
            span={12}
            style={{
              height: '850px'
            }}
          >
            <Console 
              logs={this.state.logs}
            />
          </Col>
        </Row>
      </EditorLayout>
    )
  }
}
