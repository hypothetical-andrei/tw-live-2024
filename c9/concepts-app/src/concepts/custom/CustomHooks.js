import React, { useState } from 'react'

function useGuardedState(initialValue, min, max) {
  const [value, setValue] = useState(initialValue)

  const setGuarded = (nextValue) => {
    if (nextValue >= min && nextValue <= max) {
      setValue(nextValue)
    }
  }

  return [value, setGuarded]
}

function CustomHooks() {
  const [counter, setCounter] = useGuardedState(0, 0, 10)

  const handleIncrease = (evt) => {
    setCounter(counter + 1)
  }

  const handleDecrease = (evt) => {
    setCounter(counter - 1)
  }

  return (
    <>
      <div>
        the current value is {counter}
      </div>
      <div>
        <input type='button' value='-' onClick={handleDecrease} />
        <input type='button' value='+' onClick={handleIncrease} />
      </div>        
    </>
  )
}

export default CustomHooks
