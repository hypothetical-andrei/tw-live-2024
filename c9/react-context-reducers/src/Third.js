import React from 'react'
import { useAppDispatch, useAppState } from './hooks'

const Third = () => {
	const state = useAppState()
	const dispatch = useAppDispatch()

	return (
		<div>
			<h3>
				I am 3 deep
			</h3>
			<div>
				<div>
					<h2>Counter: {state.counter.count}</h2>
					<button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
					<button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
				</div>
				<div>
					<h2>Toggled: {state.toggler.toggled ? 'On' : 'Off'}</h2>
					<button onClick={() => dispatch({ type: 'TOGGLE' })}>Toggle</button>
				</div>
        	</div>
		</div>
  )
}

export default Third