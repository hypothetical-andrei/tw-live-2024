import React from 'react'
import combinedReducer from './reducers'
import AppProvider from './AppProvider'
import Third from './Third'

const initialState = {
	counter: { count: 0 },
	toggler: { toggled: false },
};


const App = () => {
	const { reducer, initialState } = combinedReducer

	return (
			<AppProvider>
				<div>I am the app</div>
				<Third />
			</AppProvider>
 	)
}

export default App