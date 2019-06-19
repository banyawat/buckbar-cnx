import { Icon, Modal, Button, Row, Col } from 'antd';
import Router from 'next/router';

const ResultModal = ({content,visible,callback}) => {
    return (
    <Modal
        title={null}
        visible={visible}
        closable={false}
        footer={[
            null,
            <Button key="submit" type="primary" onClick={() => {
                Router.push('/')
                callback(false)
            }}>
              กลับไปหน้าแรก
            </Button>,
          ]}
    >
      <Row type="flex" justify="center">
        <Icon 
          type="info-circle"
          style={{
            fontSize: 80
          }}
        />
      </Row>
      <Row type="flex" justify="center">
        <h1>
          {content}
        </h1>
      </Row>
    </Modal>
  )
}

export default ResultModal