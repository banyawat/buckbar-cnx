import React, { Component } from 'react'
import { List, Card, Button } from 'antd'
import Link from 'next/link'
import AdminLayout from '../../src/Layout/AdminLayout'
import getAllAssignment from '../../src/libs/getAllAssignment'
import removeAssignment from '../../src/libs/removeAssignment'

export default class Questions extends Component {
  state = {
    assignments: []
  }

  componentDidMount = () => {
    this.fethAssignment()
  }

  removeAssignment = async (id) => {
    console.info('remove id', id)
    await removeAssignment(id)
    await this.fethAssignment()
  }

  fethAssignment = async () => {
    const assignments = await getAllAssignment()
    console.log(assignments);
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
              <List.Item actions={[
                <div>
                  <Link href={`/admin/quests?id=${assignment._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button onClick={() => this.removeAssignment(assignment._id)}>
                    Delete
                  </Button>
                </div>
              ]}>
                  {assignment.question}
              </List.Item>
            </Card>
          )}
        />
      </AdminLayout>
    )
  }
}
