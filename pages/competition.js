import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Row, Col } from 'antd'
import EditorLayout from '../src/Layout/EditorLayout'

const AceEditor = dynamic(() => import('react-ace'),
{
  ssr: false
})

export default class competition extends Component {
  state = {
    code: '',
  }

  componentDidMount() {
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/monokai')
  }

  render() {
    return (
      <EditorLayout>
        <Row>
          <Col span={12}>
            <AceEditor
              mode="javascript"
              theme="monokai"
              width="100%"
              height="850px"
              onChange={() => {
                console.log('test')
              }}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{
                $blockScrolling: true
              }}
              style={{
                fontSize: 18,
              }}
            />
          </Col>
          <Col span={12}>
          </Col>
        </Row>
      </EditorLayout>
    )
  }
}
