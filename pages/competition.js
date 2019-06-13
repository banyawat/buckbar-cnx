import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
import { Row, Col } from 'antd'
import axios from 'axios'
import EditorLayout from '../src/Layout/EditorLayout'
import Countdown from "../src/components/Countdown"
import Console from '../src/components/Console'
import ResultModal from '../src/components/ResultModal'
import compareResult from '../src/libs/compareResult'

const URL = 'http://localhost:8080/users'
const PREFIX = '$bugbar >'

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

class Competition extends Component {
  state = {
    time: 30,
    currentScore: 0,
    content: 'ผลลัพธ์ถูก',
    code: '',
    result: '',
    logs: [],
  }

  componentDidMount() {
    const { router } = this.props
    if(!router.query.name && !router.query.score) {
      Router.push('/')
    }
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/monokai')
    const { Hook, Decode } = require('console-feed')
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
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
    try {
      const result = eval(`
      ${this.state.code.toString()}
      answer()
      `)
      if(compareResult('test',result)){
        const { time } = this.state
        this.setState({
          currentScore: time,
          content:'ผลลัพธ์ถูก',
          visible:true,
          result,
        })
      }else{
        this.setState({
          result,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  onGetValue = (value) => {
    this.setState({
      time:value
    })
  }

  onTimeout = () => {
    this.setState({ 
      content:'หมดเวลา',
      currentScore: 0,
      visible:true,
    })
  }

  onSubmit = async (visible) => {
    const { name, score } = this.props.router.query
    const { currentScore } = this.state
    await axios.post(URL, {
      name:name,
      score:parseInt(score,10)+parseInt(currentScore, 10),
    })
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
        <Countdown callback={this.onTimeout} getValue={this.onGetValue}/>
        <ResultModal content={content} visible={visible} callback={this.onSubmit}/>
      </EditorLayout>
      </div>
    )
  }
}

export default withRouter(Competition)