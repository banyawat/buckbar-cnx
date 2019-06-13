import { Layout } from 'antd'

const { Header, Content } = Layout

const EditorLayout = ({ children }) => (
  <Layout
    style={{
      minHeight: 900,
    }}
  >
    <Header>
      test
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

export default EditorLayout