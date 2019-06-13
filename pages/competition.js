import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Row, Col } from 'antd'
import EditorLayout from '../src/Layout/EditorLayout'
import Countdown from "../src/components/Countdown"
import Console from '../src/components/Console'
import ResultModal from '../src/components/ResultModal'

const PREFIX = '$bugbar >'

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

export default class competition extends Component {
  state = {
    content: 'ผลลัพธ์ถูก',
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
        content:'ผลลัพธ์ถูก',
        visible:true,
        result,
      })
    } catch (error) {
      console.error(error)
    }
  }

  onTimeout = () => {
    this.setState({ 
      content:'หมดเวลา',
      visible:true,
    })
  }

  onSubmit = (visible) => {
    this.setState({ 
        visible:visible
     })
  }

  render() {
    const {
      content,
      visible,
    } = this.state
    return (
      <div>
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
        <Countdown callback={this.onTimeout}/>
        <ResultModal content={content} visible={visible} callback={this.onSubmit}/>
      </EditorLayout>
      </div>
    )
  }
}
