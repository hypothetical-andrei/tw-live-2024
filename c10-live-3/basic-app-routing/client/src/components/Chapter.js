import React, { useState } from 'react'

const Chapter = (props) => {
  const { item, onDelete, onSave } = props

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [content, setContent] = useState(item.content)

  const deleteChapter = () => {
    onDelete(item.id)
  }

  const edit = () => {
    setIsEditing(true)
  }

  const cancel = () => {
    setIsEditing(false)
  }

  const saveChapter = () => {
    onSave(item.id, {
      title,
      content
    })

    setIsEditing(false)
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
              <input type='button' value='save' onClick={saveChapter} />
              <input type='button' value='cancel' onClick={cancel} />
            </>
            )
          : (
            <>
              i am {item.title} with content {item.content}
              <input type='button' value='delete' onClick={deleteChapter} />
              <input type='button' value='edit' onClick={edit} />
            </>
            )
      }
    </div>
  )
}

export default Chapter
