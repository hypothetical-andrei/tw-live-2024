import React from 'react'
import AppProvider from './AppProvider'
import Third from './Third'

const App = () => {

	return (
		<AppProvider>
			<div>I am the app</div>
			<Third />
		</AppProvider>
 	)
}

export default App