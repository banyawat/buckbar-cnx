import React, { Component } from 'react'
import { Row, Input,Card,Button } from 'antd';
import Link from 'next/link';

export default class index extends Component {

  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' ,height:'100vh',width:'100%'}}>
      <Row><h1 style={{textAlign:"center"}}>THINKNET CNX</h1></Row>
      <Row type="flex" justify="space-around" align="middle">
        <Card title="BugBar Conner" align="center">
        <Input size="large" placeholder="Your Name" />
        <Link href='/competition'>
          <Button type="primary" block >Start</Button>
        </Link>
        </Card>
      </Row>
      </div>
    )
  }
}
