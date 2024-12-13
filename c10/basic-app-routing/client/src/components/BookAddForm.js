import React, { useState } from 'react'

const BookAddForm = (props) => {
  const { onAdd } = props
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const add = () => {
    onAdd({ title, content })
  }

  return (
    <div>
      <input type='text' placeholder='title' onChange={(evt) => setTitle(evt.target.value)} name='title' />
      <input type='text' placeholder='content' onChange={(evt) => setContent(evt.target.value)} name='content' />

      <input type='button' value='add' onClick={add} />
    </div>
  )
}

export default BookAddForm
