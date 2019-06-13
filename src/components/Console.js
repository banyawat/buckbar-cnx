import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const Console = dynamic(() => import('console-feed').then(Comp => Comp.Console),
{
  ssr: false
})

const CustomConsole = ({ logs }) => (
  <div style={{ 
    backgroundColor: '#242424',
    height: '100%'
  }}>
    <Console logs={logs} variant="dark" />
  </div>
)

export default CustomConsole