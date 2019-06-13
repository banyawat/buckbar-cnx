import { Layout, Button } from 'antd'

const { Header, Content } = Layout

const EditorLayout = ({ 
  children,
  onCompile,
}) => (
  <Layout
    style={{
      minHeight: '100vh'
    }}
  >
    <Header
      style={{
        height: 70
      }}
    >
        <img 
          src="/static/img/logo.png"
          style={{
            padding: 15,
            height: '60px'
          }}
        />
        <Button 
          type="primary"
          icon="play-circle"
          onClick={onCompile}
          style={{

          }}
        >
          Run
        </Button>
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