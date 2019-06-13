import React, { Component } from 'react'
import { Row, Input,Card,Button,Modal } from 'antd';
import Router from 'next/router'
import axios from 'axios'
const confirm = Modal.confirm;

export default class index extends Component {
  state = {
    name:''
  }
  setName=(e)=>{
    this.setState({
      name: e
    })
  }

  showConfirm= async()=> {
    const { name } = this.state
    const username = await axios('http://localhost:8080/users')
    console.log(username)
    confirm({
      title: 'ชื่อซ้ำจ้า',
      content: 'ชื่อนี้ถูกใช้ไปแล้ว คุณคือบุคคลเดิมที่ใช้ชื่อนี้หรือไหม่?',
      onOk() {
        Router.push({
          pathname: '/competition',
          query: { name },
        })
      },
    });
  }

  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' ,height:'100vh',width:'100%'}}>
      <Row><h1 style={{textAlign:"center"}}>THINKNET CNX</h1></Row>
      <Row type="flex" justify="space-around" align="middle">
        <Card title="BugBar Conner" align="center">
        <Input size="large" placeholder="Your Name" onBlur={(e)=>{this.setName(e.target.value)}}/>
        <Button 
          type="primary" block 
          onClick={this.showConfirm}
        >
          Start
        </Button>
        </Card>
      </Row>
      </div>
    )
  }
}
