import React from 'react'
import { useParams } from 'react-router-dom'

function Item (props) {
  const params = useParams()
  return (
    <div>item is {params.item}</div>
  )
}

export default Item
