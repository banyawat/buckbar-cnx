import { Modal, Button } from 'antd';
import Router from 'next/router';

const ResuletModal = ({content,visible,callback}) => {
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
              Submit
            </Button>,
          ]}
    >
        {content}
    </Modal>
  )
}

export default ResuletModal