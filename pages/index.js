import React, { Component } from 'react'
import { Row, Input,Card,Button,Modal } from 'antd';
import Router from 'next/router'
import axios from 'axios'
const confirm = Modal.confirm;
const URL = 'http://localhost:8080/users'
export default class index extends Component {
  state = {
    name:'',
    score: 0,
  }
  setName=(e)=>{
    this.setState({
      name: e
    })
  }

  countDown = () => {
    let secondsToGo = 3
    const modal = Modal.success({
      title: 'Countdown',
      content: `กำลังจะเข้าสู่หน้าโจทย์ภายในเวลา ${secondsToGo} วินาที`,
      onOk: () => {
        this.goToCompetition()
      }
    })
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `กำลังจะเข้าสู่หน้าโจทย์ภายในเวลา ${secondsToGo} วินาที`,
        onOk: () => {
          this.goToCompetition()
        },
      })
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      modal.destroy()
      this.goToCompetition()
    }, secondsToGo * 1000);
  }

  goToCompetition = () => {
    const { name, score } = this.state
    Router.push(`/competition?name=${name}&score=${score}`, '/competition', {
      shallow: true
    })
  }

  submit= async()=> {
    let isSameName = null
    const { name } = this.state
    const {data} = await axios(URL)
    if(name){
      if(data){
        data.forEach((e)=>{
          if(e.name === name){
            isSameName = true
            this.setState({
              score: e.score
            })
          }
        })
      }
      await this.showConfirm(isSameName)
    } else {
      this.handleNotName()
    }
  }

  showConfirm = async(isSameName)=>{
    const { name } = this.state
    if(isSameName){
      confirm({
        title: 'ชื่อซ้ำจ้า',
        content: 'ชื่อนี้ถูกใช้ไปแล้ว คุณคือบุคคลเดิมที่ใช้ชื่อนี้หรือไหม่?',
        onOk:() => {
          this.countDown()
        },
      });
    }else{
      await axios.post(URL, {
        name,
        score: 0,
      })
      this.countDown()
    }
  }

  handleNotName = () =>{
    Modal.warning({
      title: 'กรุณาระบุชื่อ',
    });
  }
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' ,height:'100vh',width:'100%'}}>
    
      <Row 
      style={{
        marginTop: '10%',
      }}
      type="flex" justify="space-around" align="middle">
        <Card 
        style={{
          padding: 70,
        }}
        cover={<img alt="logo" src="/static/img/logo.png" />}
        >
        <Input 
          style={{
            marginTop: 50,
          }}
          onPressEnter={this.submit}
        size="large" placeholder="Your Name" onChange={(e)=>{this.setName(e.target.value)}}/>
        <Button 
          type="primary" 
          block 
          onClick={this.submit}
        >
          Start
        </Button>
        </Card>
      </Row>
      </div>
    )
  }
}
