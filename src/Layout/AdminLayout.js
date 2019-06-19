import { Layout, Button } from 'antd'
import { withRouter } from 'next/router'

const { Header, Content } = Layout

const AdminLayout = ({ 
  children
}) => (
  <Layout
    style={{
      minHeight: '100vh'
    }}
  >
    <Header
      style={{
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
        <img 
          src="/static/img/logo.png"
          style={{
            padding: 15,
            width: 130
          }}
        />
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      {children}
    </Content>
  </Layout>
)

export default withRouter(AdminLayout)