import React, { useState } from 'react'

const ChapterAddform = (props) => {
  const { onAdd } = props
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')

  return (
    <div>
      <input type='text' placeholder='title' onChange={(evt) => {
        setTitle(evt.target.value)
      }} />
      <input type='text' placeholder='content' onChange={(evt) => {
        setContent(evt.target.value)
      }} />
      <input type='button' value='add' onClick={() => {
        onAdd({
          title,
          content
        })
      }} />
    </div>
  )
}

export default ChapterAddform