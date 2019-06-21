import React, { Component } from 'react'
import { 
  Row, 
  Col, 
  Card,
  Input,
  Switch,
  Button, 
  notification
} from 'antd'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
import CONSTANT from '../../src/constants'
import Console from '../../src/components/Console'
import AdminLayout from '../../src/Layout/AdminLayout'
import getAllAssignment from '../../src/libs/getAllAssignment'
import updateAssignment from '../../src/libs/updateAssignment'
import createNewQuestion from '../../src/libs/createNewQuestion'
import compareResult from '../../src/libs/compareResult'

const { EDITOR_DEFAULT_PROPS } = CONSTANT

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

const { QUEST_PATTERN } = CONSTANT

const initialState = {
  loading: false,
  id: '',
  title: '',
  questionCode: QUEST_PATTERN,
  answerCode: '',
  testResultMessage: null,
  logs: [],
}

class Quest extends Component {
  state = initialState

  static getDerivedStateFromProps (props, state) {
    const { id } = props.router.query
    return {
      ...state,
      id,
    }
  }

  componentDidMount () {
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/monokai')
    if(this.state.id && this.state.id !== '') {
      this.fetchAssignment()
    }
    const { Hook, Decode } = require('console-feed')
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
  }

  fetchAssignment = async () => {
    const result = await getAllAssignment({
      id: this.state.id
    })
    const { answer, name, question } = result
    this.setState({
      title: name,
      answerCode: answer,
      questionCode: question,
    })
  }

  onTitleChange = ({ target }) => {
    this.setState({
      title: target.value
    })
  }

  onQuestionCodeEditorChange = (code) => {
    this.setState({
      questionCode: code
    })
  }

  onAnswerCodeEditorChange = (code) => {
    this.setState({
      answerCode: code
    })
  }

  onSubmit = async () => {
    const { 
      title,
      questionCode,
      answerCode,
      id,
    } = this.state
    if(!title ||
      !questionCode ||
      !answerCode ||
      title === initialState.title ||
      questionCode === initialState.questionCode ||
      answerCode === initialState.answerCode) {
      notification.warn({
        message: 'ใส่ชื่อด้วย โจทย์ด้วย คำตอบด้วยสิ!'
      })
      return
    }
    this.setState({
      loading: true
    })
    if(id) {
      const updateResult = await updateAssignment(id, {
        name: title,
        question: questionCode,
        answer: answerCode
      })
      if(updateResult === 'ok') {
        notification.success({
          message: 'อัพเดทโจทย์ให้แล้วจร้า'
        })
        this.setState(initialState)
        this.fetchAssignment()

      } else {
        notification.success({
          message: 'มีบางอย่างผิดพลาด ลองดูใหม่นะ'
        })
      }
      return
    }
    const creatingResult = await createNewQuestion(
      title,
      questionCode,
      answerCode
    )
    if(creatingResult) {
      notification.success({
        message: 'เพิ่มโจทย์ให้แล้วจร้า'
      })
      this.setState(initialState)
      Router.push('/admin/dashboard')
    } else {
      notification.success({
        message: 'มีบางอย่างผิดพลาด ลองดูใหม่นะ'
      })
      this.setState({
        loading: false,
      })
    }
    return
  }

  onTest = () => {
    this.setState({
      logs: []
    })
    const result = eval(`
      ${this.state.questionCode.toString()}
      answer()
    `)
    console.log(result)
    if(compareResult(this.state.answerCode, result)) {
      this.setState({
        testResultMessage: 'ผ่าน'
      })
    } else {
      this.setState({
        testResultMessage: 'ไม่ผ่าน'
      })
    }
  }

  render() {
    return (
      <AdminLayout>
        <Row
          style={{
            marginTop: 10
          }}
        >
          <Col span={2}>
            <h2>
            ชื่อโจทย์
            </h2>
          </Col>
          <Col span={22}>
            <Input
              value={this.state.title}
              onChange={this.onTitleChange}
              title="Question name"
            />
          </Col>
        </Row>
        <Row gutter={4}>
          <Col span={12}>
            <h2>Question Code (.js)</h2>
            <AceEditor 
              {...EDITOR_DEFAULT_PROPS}
              mode='javascript'
              name="ace-code-question"
              value={this.state.questionCode}
              onChange={this.onQuestionCodeEditorChange}
            />
          </Col>
          <Col span={12}>
            <h2>Answer (.txt)</h2>
            <AceEditor 
              {...EDITOR_DEFAULT_PROPS}
              mode="text"
              name="ace-code-answer"
              value={this.state.answerCode}
              onChange={this.onAnswerCodeEditorChange}
            />
          </Col>
        </Row>
        <Row
          style={{
            marginTop: 5,
            height: 220,
            maxHeight: 220,
            overflowY: 'scroll'
          }}
          type="flex"
        >
          <Col span={4}>
            <Card style={{ height: '100%' }}>
              <Button
                size="large"
                type="primary"
                icon="play-circle"
                style={{
                  width: '100%',
                  marginTop: 10
                }}
                onClick={this.onTest}
              >
                  Run
              </Button>
              <Row
                style={{
                  marginTop: 10,
                }}
                gutter={8}
                type="flex" 
                justify="center"
              >
                <Col>
                  <span>ไม่ผ่าน</span>
                </Col>
                <Col>
                  <Switch checked={this.state.testResultMessage === 'ผ่าน'} />
                </Col>
                <Col>
                  <span>ผ่าน</span>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={16}>
            <Console logs={this.state.logs} />
          </Col>
          <Col span={4}>
              <Button
                loading={this.state.loading}
                size="large"
                type="primary"
                icon="play-circle"
                style={{
                  width: '100%',
                  marginTop: 10
                }}
                onClick={this.onSubmit}
              >
                {(this.state.id === '' || !this.state.id) ? 'Add new question' : 'Update question'}
              </Button>
          </Col>
        </Row>
      </AdminLayout>
    )
  }
}

export default withRouter(Quest)