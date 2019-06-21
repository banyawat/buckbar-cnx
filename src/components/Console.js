import React from 'react'
import dynamic from 'next/dynamic'

const Console = dynamic(() => import('console-feed').then(Comp => Comp.Console),
{
  ssr: false
})

const CustomConsole = (props) => (
      <div 
        style={{ 
          backgroundColor: '#242424',
          height: '100%',
          overflowY: 'scroll',
          ...props.style
        }}
      >
        <Console 
          logs={props.logs} variant="dark"
        />
      </div>
    )

export default CustomConsole