import React, { Component } from 'react'
import { 
  Row, 
  Col, 
  Button, 
  Input,
  notification
} from 'antd'
import Router, { withRouter } from 'next/router'
import Editor from '../../src/components/Editor'
import AdminLayout from '../../src/Layout/AdminLayout'
import getAllAssignment from '../../src/libs/getAllAssignment'
import updateAssignment from '../../src/libs/updateAssignment'
import createNewQuestion from '../../src/libs/createNewQuestion'

const initialState = {
  loading: false,
  id: '',
  title: '',
  questionCode: '',
  answerCode: '',
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
    if(this.state.id !== '') {
      this.fetchAssignment()
    }
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
    if(title === '' && questionCode === '' && answerCode === '') {
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
            <Editor 
              mode='javascript'
              name="ace-code-question"
              value={this.state.questionCode}
              onChange={this.onQuestionCodeEditorChange}
            />
          </Col>
          <Col span={12}>
            <h2>Answer (.txt)</h2>
            <Editor 
              mode="text"
              name="ace-code-answer"
              value={this.state.answerCode}
              onChange={this.onAnswerCodeEditorChange}
            />
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Button
            loading={this.state.loading}
            size="large"
            type="primary"
            icon="play-circle"
            style={{
              marginTop: 10
            }}
            onClick={this.onSubmit}
          >
            {(this.state.id === '') ? 'Add new question' : 'Update question'}
          </Button>
        </Row>
      </AdminLayout>
    )
  }
}

export default withRouter(Quest)