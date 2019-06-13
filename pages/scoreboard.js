import React, { Component } from 'react'
import '../assets/scoreboard.less'
import { Button, Layout, List, Avatar } from 'antd'
import defaultData from '../data/db.json'

const { Header, Content, Footer } = Layout

export default class Scoreboard extends Component {
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
          <div>{item.score}</div>
      </List.Item>
    )
  }

  render() {
    const dataSorted = this.sortScore(defaultData.users, 'score', false)

    return (
      <div className="scoreboard">
        <Layout className="main-layout">
          <Content>
            <div className="rank-board">
              <div className="rank-header">
                <img 
                  src="/static/img/logo.png"
                  style={{
                    padding: 15,
                    width: 130
                  }}
                />
              </div>
              <List
                size="large"
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
