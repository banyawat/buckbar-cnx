import React from 'react'
import App, { Container } from 'next/app'
import EditorWrapper from '../src/Layout/EditorWrapper'
import '../src/styles/index.less'

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount () {
    require('brace')
    require('brace/mode/javascript')
    require('brace/theme/monokai')
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
