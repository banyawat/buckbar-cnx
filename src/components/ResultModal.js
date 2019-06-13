import { Icon, Modal, Button, Row, Col } from 'antd';
import Router from 'next/router';

const ResultModal = ({content,visible,callback}) => {
    return (
    <Modal
        title={null}
        visible={visible}
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
      <Row>
        <h2>
          {content}
        </h2>
      </Row>
    </Modal>
  )
}

export default ResultModal