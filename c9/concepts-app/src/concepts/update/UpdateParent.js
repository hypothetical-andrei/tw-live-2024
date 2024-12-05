import React, { useState } from 'react'
import UpdateChild from './UpdateChild'

function UpdateParent() {
  const [id, setId] = useState(1)

  const updateId = (evt) => {  
    setId(evt.target.value)
  }

  return (
    <div>
      <div>
        <input type='text' onBlur={updateId} />
      </div>
      <div>
        <UpdateChild item={id} />
      </div>
    </div>
  )
}

export default UpdateParent
