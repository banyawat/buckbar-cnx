import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Row, Col } from 'antd'
import EditorLayout from '../src/Layout/EditorLayout'
import Countdown from "../src/components/Countdown"
import Console from '../src/components/Console'
import ResultModal from '../src/components/ResultModal'

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

export default class competition extends Component {
  state = {
    content: 'ผลลัพธ์ถูก',
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
          >
            <Console />
          </Col>
        </Row>
        <Countdown callback={this.onTimeout}/>
        <ResultModal content={content} visible={visible} callback={this.onSubmit}/>
      </EditorLayout>
      </div>
    )
  }
}
