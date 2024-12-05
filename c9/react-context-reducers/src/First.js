import React from 'react'
import Second from './Second'

const First = () => {
  return (
		<div>
			<h1>
				I am 1 deep
			</h1>
			<Second />
		</div>
  )
}

export default First