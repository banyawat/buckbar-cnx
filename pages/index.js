import React, { Component } from 'react'
import { Row, Input,Card,Button,Modal } from 'antd';
import Router from 'next/router'
import axios from 'axios'
const confirm = Modal.confirm;
const URL = 'http://localhost:8080/users'
export default class index extends Component {
  state = {
    name:''
  }
  setName=(e)=>{
    this.setState({
      name: e
    })
  }

  checkSameName= async()=> {
    let isSameName = null
    let score = 0
    const { name } = this.state
    const {data} = await axios(URL)
    if(data){
      data.forEach((e)=>{
        if(e.name === name){
          isSameName = true
          score = e.score 
        }
      })
    }
    await this.showConfirm(isSameName,score)
  }

  showConfirm = async(isSameName,score)=>{
    const { name } = this.state
    if(isSameName){
      confirm({
        title: 'ชื่อซ้ำจ้า',
        content: 'ชื่อนี้ถูกใช้ไปแล้ว คุณคือบุคคลเดิมที่ใช้ชื่อนี้หรือไหม่?',
        onOk() {
          Router.push({
            pathname: '/competition',
            query: { name,score },
          })
        },
      });
    }else{
      await axios.post(URL, {
        name,
        score:0,
      })
      Router.push({
        pathname: '/competition',
        query: { name,score },
      })
    }
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
          onClick={this.checkSameName}
        >
          Start
        </Button>
        </Card>
      </Row>
      </div>
    )
  }
}
