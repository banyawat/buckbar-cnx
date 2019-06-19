import Link from 'next/link'
import { Layout, Menu } from 'antd'
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
      <Link href='/'>
        <a>
          <img 
            src="/static/img/logo.png"
            style={{
              padding: 15,
              width: 130
            }}
          />
        </a>
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
      >
        <Menu.Item>
          <Link href="/admin/dashboard">
            <a>
              Dashboard
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/admin/quests">
            <a>
              Quests
            </a>
          </Link>
        </Menu.Item>
      </Menu>
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