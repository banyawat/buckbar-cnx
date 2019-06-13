import React, { Component } from 'react'
import '../assets/scoreboard.less'
import { Button, Layout, List, Avatar, Badge } from 'antd'
import axios from 'axios'
import defaultData from '../data/db.json'

const { Header, Content, Footer } = Layout

export default class Scoreboard extends Component {
  state = {
    data: [],
  }

  componentWillMount() {
    this.getScore()
  }

  getScore = async () => {
    const { data } = await axios.get('http://localhost:8080/users')
    this.setState({
      data,
    })
  }
  
  sortScore = (data, prop, asc) => {
    return data.sort((a, b) => {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
          return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }

  getTopStyle = (rank) => {
    switch (rank) {
      case 1:
        return 'top one'
        break;
      case 2:
        return 'top two'
        break;
      case 3:
        return 'top three'
        break;
      default:
        return ''
        break;
    }
  }

  renderListItem = (item, index) => {
    console.log(index)
    return (
      <List.Item className={this.getTopStyle(index+1)}>
        <List.Item.Meta
          avatar={<Avatar src="https://cdn4.iconfinder.com/data/icons/web-development-6-1/32/tech_user_boss_person-512.png" />}
          title={<a href="https://ant.design">{item.name}</a>}
        />
          <div className={(index < 3) ? 'top-score' : ''}>{item.score}</div>
      </List.Item>
    )
  }

  render() {
    const dataSorted = this.sortScore(this.state.data, 'score', false)
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
