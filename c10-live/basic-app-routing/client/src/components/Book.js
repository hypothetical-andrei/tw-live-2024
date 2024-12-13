import React, { useState } from 'react'

function Book (props) {
  const { item, onDelete, onSave, onSelect } = props

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [content, setContent] = useState(item.content)

  const deleteBook = () => {
    onDelete(item.id)
  }

  const edit = () => {
    setIsEditing(true)
  }

  const cancel = () => {
    setIsEditing(false)
  }

  const saveBook = () => {
    onSave(item.id, {
      title,
      content
    })

    setIsEditing(false)
  }

  const selectBook = () => {
    onSelect(item.id)
  }

  return (
    <div>
      {
        isEditing
          ? (
            <>
              i am
              <input type='text' placeholder='title' onChange={(evt) => setTitle(evt.target.value)} value={title} />
              with content
              <input type='text' placeholder='content' onChange={(evt) => setContent(evt.target.value)} value={content} />
              <input type='button' value='save' onClick={saveBook} />
              <input type='button' value='cancel' onClick={cancel} />
            </>
            )
          : (
            <>
              i am {item.title} with content {item.content}
              <input type='button' value='delete' onClick={deleteBook} />
              <input type='button' value='edit' onClick={edit} />
              <input type='button' value='select' onClick={selectBook} />
            </>
            )
      }
    </div>
  )
}

export default Book
