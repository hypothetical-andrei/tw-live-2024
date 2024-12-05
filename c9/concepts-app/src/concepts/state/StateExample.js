import React, { useState } from 'react'

function StateExample() {
  const [counter, setCounter] = useState(0)

  const handleClick = (evt) => {
    setCounter(counter + 1)
  }

  return (
    <>
      <div>
        the current value is {counter}
      </div>
      <div>
        <input type='button' value='+' onClick={handleClick} />
      </div>        
    </>
  )
}

export default StateExample
