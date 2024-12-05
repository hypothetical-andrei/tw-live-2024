import React, { useState } from 'react'
import First from './First'
import { StateContext } from './StateContext'

const ContextParent = () => {
  const [contextValue, setContextValue] = useState({
    theme: 'dark'
  })

  const toggleTheme = () => {
    if (contextValue.theme === 'dark') {
      setContextValue({ ...contextValue, theme: 'light' })
    } else {
      setContextValue({ ...contextValue, theme: 'dark' })
    }    
  }
   
  return (
    <StateContext.Provider value={contextValue}>
      <div>
        <div>
          I am the container app
        </div>
        <First />
        <input type='button' value='toggle' onClick={() => toggleTheme()} />
      </div>
    </StateContext.Provider>
  )
}

export default ContextParent