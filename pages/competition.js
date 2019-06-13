import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Row, Col } from 'antd'
import EditorLayout from '../src/Layout/EditorLayout'
import Countdown from "../src/components/Countdown"
import Console from '../src/components/Console'

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

export default class competition extends Component {
  state = {
    code: '',
    result: '',
  }

  componentDidMount() {
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/monokai')
  }

  onEditorChange = async (code) => {
    await this.setState({
      code,
    })
  }

  onCompile = () => {
    try {
      const result = eval(this.state.code.toString())
      this.setState({
        result,
      })
    } catch (error) {
      this.setState({
        result: `Error: ${error}`
      })
    }
  }

  render() {
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
          >
            <Console />
          </Col>
        </Row>
        <Countdown />
      </EditorLayout>
      </div>
    )
  }
}
