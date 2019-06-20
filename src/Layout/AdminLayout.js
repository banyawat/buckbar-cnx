import Link from 'next/link'
import { Layout, Menu } from 'antd'
import { withRouter } from 'next/router'

const { Header, Content } = Layout

const AdminLayout = ({ 
  children,
  router
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
      <a href='/'>
        <img 
          src="/static/img/logo.png"
          style={{
            padding: 15,
            width: 130
          }}
        />
      </a>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[router.pathname]}
      >
        <Menu.Item
          key="/admin/dashboard"
        >
          <Link href="/admin/dashboard">
            <a>
              Dashboard
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="/admin/quests"
        >
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