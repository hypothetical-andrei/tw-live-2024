import React, { useState, useEffect, useRef } from 'react'
import ChapterStore from '../stores/ChapterStore'
import ChapterAddForm from './ChapterAddForm'
import Chapter from './Chapter'

const BookDetails = (props) => {
  const { item, onCancel } = props
  const [chapters, setChapters ] = useState([]) 

  const storeRef = useRef(new ChapterStore(item))

  useEffect(() => {
    storeRef.current.getChapters()
    storeRef.current.emitter.addListener('GET_CHAPTERS_SUCCESS', () => {
      setChapters(storeRef.current.data)
    })
  }, [])

  const addItem = (item) => {
    storeRef.current.addChapter(item)
  }

  const saveItem = (id, item) => {
    storeRef.current.saveChapter(id, item)
  }

  const deleteItem = (id) => {
    storeRef.current.deleteChapter(id)
  }

  return (
    <div>
      <h4>
        I am the details for { item }
      </h4>
      <div>
        <h3>Chapter list</h3>
        {
          chapters.map(e => <Chapter item={e} key={e.id} onSave={saveItem} onDelete={deleteItem} />)
        }
        <div>
          <ChapterAddForm onAdd={addItem} />
        </div>
      </div>
      <input type='button' value='cancel' onClick={
        () => {
          onCancel()
        }
      } />
    </div>
  )
}

export default BookDetails