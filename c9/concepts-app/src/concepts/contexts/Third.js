import React from 'react'
import { useContext } from 'react'
import { StateContext } from './StateContext'

const Third = () => {
	const stateContext = useContext(StateContext)

	return (
		<div>
			<h3>
				I am 3 deep
			</h3>
			<div>
				Theme is {JSON.stringify(stateContext, null, 2)}
			</div>
		</div>
  )
}

export default Third