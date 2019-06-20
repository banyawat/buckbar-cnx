import React, { Component } from 'react'
import { List, Card, Button, Row, Col } from 'antd'
import Link from 'next/link'
import AdminLayout from '../../src/Layout/AdminLayout'
import getAllAssignment from '../../src/libs/getAllAssignment'
import removeAssignment from '../../src/libs/removeAssignment'
import Editor from '../../src/components/Editor'

export default class Questions extends Component {
  state = {
    assignments: []
  }

  componentDidMount = () => {
    this.fethAssignment()
  }

  removeAssignment = async (id) => {
    await removeAssignment(id)
    await this.fethAssignment()
  }

  fethAssignment = async () => {
    const assignments = await getAllAssignment()
    console.log(assignments)
    this.setState({
      assignments
    })
  }

  render() {
    return (
      <AdminLayout>
        <List
          dataSource={this.state.assignments}
          renderItem={assignment => (
            <Card>
              <List.Item 
                actions={[
                  <div>
                    <Link href={`/admin/quests?id=${assignment._id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => this.removeAssignment(assignment._id)}>
                      Delete
                    </Button>
                  </div>
                ]}>
                  <Col style={{ width: '100%' }}>
                    <Row><h2>{assignment.name}</h2></Row>
                    <Row style={{ width: '100%' }} gutter={4}>
                      <Col span={12}>
                        <h3>Question</h3>
                        <Editor
                          highlightActiveLine={false}
                          readOnly={true}
                          height="250px"
                          value={assignment.question}
                        />
                      </Col>
                      <Col span={12}>
                        <h3>Answer</h3>
                        <Editor
                          mode="text"
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
      </AdminLayout>
    )
  }
}
