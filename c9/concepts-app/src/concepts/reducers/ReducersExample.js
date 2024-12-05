import React, { useReducer } from 'react'

function historyReducer (state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, counter: state.counter + 1, history: [...state.history, state.counter + 1] }
        case 'DECREMENT':
            return { ...state, counter: state.counter - 1,  history: [...state.history, state.counter - 1] }
        default:
            return state
    }
}

function ReducersExample() {
  const [state, dispatch] = useReducer(historyReducer, { counter: 0, history: [] })

  const handleIncClick = (evt) => {
    dispatch({ type: 'INCREMENT' })
  }

  const handleDecClick = (evt) => {
    dispatch({ type: 'DECREMENT' })
  }


  return (
    <>
      <div>
        the current value is {state.counter}
      </div>
      <div>
        history of counters is {state.history.join(',')}
      </div>
      <div>
        <input type='button' value='+' onClick={handleIncClick} />
        <input type='button' value='-' onClick={handleDecClick} />
      </div>        
    </>
  )
}

export default ReducersExample

