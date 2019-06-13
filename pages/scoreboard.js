import React, { Component } from 'react'
import '../assets/scoreboard.less'
import { Button, Layout, List, Avatar } from 'antd'
const { Header, Content, Footer } = Layout
import dynamic from 'next/dynamic'
import defaultData from '../data/db.json'

// const low = dynamic(import('lowdb'))
// const LocalStorage = dynamic(import('lowdb/adapters/LocalStorage'))
// const adapter = new LocalStorage('db')
// const db = low(adapter)

// db.defaults(defaultData)
//   .write()

export default class scoreboard extends Component {
  sortScore = (data, prop, asc) => {
    return data.sort((a, b) => {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
          return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }

  renderListItem = (item) => {
    return (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.name}</a>}
        />
      </List.Item>
    )
  }

  render() {
    // console.log(db.get('users').find().value())
    const dataSorted = this.sortScore(defaultData.users, 'score', false)

    return (
      <div className="scoreboard">
        <Layout className="main-layout">
          <Header className="header">
            Scoreboard
          </Header>
          <Content>
            <div className="rank-board">
              <List
                dataSource={dataSorted}
                renderItem={this.renderListItem}
              />
            </div>
          </Content>
          <Footer>Bugbar ©2019 Created by THiNKNET</Footer>
        </Layout>
      </div>
    )
  }
}
