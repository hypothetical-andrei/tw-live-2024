import React, { useState } from 'react';

const Book = (props) => {
  const { item, onDelete, onSave, onSelect } = props
  const [isEditing, setIsEditing] = useState(false)
  const [ title, setTitle ] = useState(item.title)
  const [ content, setContent ] = useState(item.content)

  const save = (evt) => {
    onSave(item.id, {
      title, content
    })
    setIsEditing(false)
  }

  return (
    <div>
      {
        isEditing
        ? (
          <>
            <input type='text' placeholder='title' onChange={(evt) => {
              setTitle(evt.target.value)
            }} value= {title} />
            <input type='text' placeholder='content' onChange={(evt) => {
              setContent(evt.target.value)
            }} value={content} />
            <input type='button' value='save' onClick={save} />
            <input type='button' value='cancel' onClick={() => {
                setIsEditing(false)
              }} />
          </>
        ) : (
          <>
            Title is <b>{item.title}</b> and content is <b>{item.content}</b> 
            <span>
              <input type='button' value='delete' onClick={() => {
                onDelete(item.id)
              }} />
              <input type='button' value='edit' onClick={() => {
                setIsEditing(true)
              }} />
              <input type='button' value='select' onClick={
                () => {
                  onSelect(item.id)
                }
              } />
            </span>
          </>
        )
      }
     
    </div>
  )
}

export default Book