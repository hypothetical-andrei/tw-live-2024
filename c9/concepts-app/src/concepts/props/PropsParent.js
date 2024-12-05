import React from 'react'
import PropsChild from './PropsChild'

function PropsParent(){
  const data = [{
    description: 'test1',
    id: 1
  },{
    description: 'test2',
    id: 2
  },{
    description: 'test3',
    id: 3
  }]

  return (
    <div>
        {
          data.map(e => <PropsChild item={e} key={e.id} />)
        }
    </div>
  )
}

export default PropsParent
