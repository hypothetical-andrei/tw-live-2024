import React, { useState } from 'react'

const Chapter = (props) => {
  const { item, onSave, onDelete } = props
  const [ isEditing, setIsEditing ] = useState(false)
  const [ title, setTitle ] = useState(item.title)
  const [ content, setContent ] = useState(item.content)

  const save = () => {
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
              I have title 
              <input type='text' placeholder='title' onChange={(evt) => {
                setTitle(evt.target.value)
              }} value={title} />                
              and content 
              <input type='text' placeholder='content' onChange={(evt) => {
                setContent(evt.target.value)
              }} value={content} />
              <span>
              <input type='button' value='cancel' onClick={() => {
                setIsEditing(false)
              }} />
              <input type='button' value='save' onClick={save} />
            </span>
          </>
        ) : (
          <>
            I have title <b>{item.title}</b> and content <b>{item.content}</b>
            <span>
              <input type='button' value='delete' onClick={() => {
                onDelete(item.id)
              }} />
              <input type='button' value='edit' onClick={() => {
                setIsEditing(true)
              }} />
            </span>
          </>
        )
      }
    
    </div>
  )
}

export default Chapter