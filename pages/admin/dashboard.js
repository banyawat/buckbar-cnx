import React, { Component } from 'react'
import { List, Card, Button, Row, Col, Skeleton } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import CONSTANT from '../../src/constants'
import AdminLayout from '../../src/Layout/AdminLayout'
import getAllAssignment from '../../src/libs/getAllAssignment'
import removeAssignment from '../../src/libs/removeAssignment'

const { EDITOR_DEFAULT_PROPS } = CONSTANT

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

export default class Questions extends Component {
  state = {
    loading: false,
    assignments: []
  }

  componentDidMount = () => {
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/monokai')
    this.fetchAssignment()
  }

  removeAssignment = async (id) => {
    await removeAssignment(id)
    await this.fetchAssignment()
  }

  fetchAssignment = async () => {
    this.setState({
      loading: true
    })
    const assignments = await getAllAssignment()
    this.setState({
      loading: false,
      assignments
    })
  }

  render() {
    return (
      <AdminLayout>
        <Skeleton 
          loading={this.state.loading}
          active
          paragraph={{ rows: 4 }}
        >
          <List
            dataSource={this.state.assignments}
            renderItem={assignment => (
              <Card style={{
                margin: '8px 0'
              }}>
                <List.Item 
                  actions={[
                    <Col>
                      <Row>
                        <Link href={`/admin/quests?id=${assignment._id}`}>
                          <Button style={{
                            width: '100%'
                          }}>Edit</Button>
                        </Link>
                      </Row>
                      <Row>
                        <Button onClick={() => this.removeAssignment(assignment._id)}>
                          Delete
                        </Button>
                      </Row>
                    </Col>
                  ]}>
                    <Col style={{ width: '100%' }}>
                      <Row><h2>{assignment.name}</h2></Row>
                      <Row style={{ width: '100%' }} gutter={4}>
                        <Col span={12}>
                          <h3>Question</h3>
                          <AceEditor
                            {...EDITOR_DEFAULT_PROPS}
                            name="question-display"
                            highlightActiveLine={false}
                            readOnly={true}
                            height="250px"
                            value={assignment.question}
                          />
                        </Col>
                        <Col span={12}>
                          <h3>Answer</h3>
                          <AceEditor
                            {...EDITOR_DEFAULT_PROPS}
                            name="answer-display"
                            mode="text"
                            focus={false}
                            highlightActiveLine={false}
                            readOnly={true}
                            height="250px"
                            value={assignment.answer}
                          />
                        </Col>
                      </Row>
                    </Col>
                </List.Item>
              </Card>
            )}
          />
        </ Skeleton>
      </AdminLayout>
    )
  }
}
