import React, { useState } from 'react'

function LiftingChild(props) {
  const { item } = props
  const [description, setDescription] = useState(item.description)

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value)
  }

  const handleClick = (evt) => {
      props.onParentChange(item.id, description)
  }

  return (
    <div>
      for {item.id} description in child: 
      <input type='text' onChange={handleDescriptionChange} value={description} />
      <input type='button' value='update' onClick={handleClick} />
    </div>
  )
}

export default LiftingChild
