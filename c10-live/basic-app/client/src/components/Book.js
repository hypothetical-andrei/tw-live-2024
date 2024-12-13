import React, { useState} from 'react'

const Book = (props) => {
  const { item, onDelete, onSave, onSelect } = props
  const [isEditing, setIsEditing] = useState(false)
  const [ title, setTitle ] = useState(item.title)
  const [ content, setContent ] = useState(item.content)

  const deleteBook = () => {
    onDelete(item.id)
  }

  const saveBook = () => {
    onSave(item.id, {
      title,
      content
    })
    setIsEditing(false)

  }

  const edit = () => {
    setIsEditing(true)
  }

  const cancel = () => {
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
              <input type='text' placeholder='title' onChange={(evt) => setTitle(evt.target.value)} value={title} />
              <input type='text' placeholder='content' onChange={(evt) => setContent(evt.target.value)} value={content} />
              <input type="button" value="save" onClick={saveBook} />
              <input type="button" value="cancel" onClick={cancel} />
            </>
          )
          : (
            <>
              I am a book with title <b>{item.title}</b> and content <b>{item.content}</b>
              <input type="button" value="delete" onClick={deleteBook} />
              <input type="button" value="edit" onClick={edit} />
              <input type="button" value="select" onClick={selectBook} />
            </>
          )
      }
     
    </div>
  )
}

export default Book