import React, { useState, useEffect, useRef } from 'react'
import ChapterStore from '../store/ChapterStore'
import ChapterAddForm from './ChapterAddForm'
import Chapter from './Chapter'

const BookDetails = (props) => {
  const { itemId, onCancel } = props
  const [ chapters, setChapters ] = useState([])

  const storeRef = useRef(new ChapterStore(itemId))

  useEffect(() => {
    storeRef.current.getChapters()
    storeRef.current.emitter.addListener('GET_CHAPTERS_SUCCESS', () => {
      setChapters(storeRef.current.data)
    })
  }, [])


  const addChapter = (item) => {
    storeRef.current.addChapter(item)
  }

  const saveChapter = (id, item) => {
    storeRef.current.saveChapter(id, item)
  }

  const deleteChapter = (id) => {
    storeRef.current.deleteChapter(id)
  }

  return (
    <div>
      <h4>this is the details {itemId}</h4>
      <div>
        <h5>list of chapters</h5>
          {
            chapters.map(e => <Chapter item={e} key={e.id} onSave={saveChapter} onDelete={deleteChapter} />)
          }
          <div>
            <ChapterAddForm onAdd={addChapter} />
          </div>
      </div>
      <input type='button' value='cancel' onClick={() => {
        onCancel()
      }} />
    </div>
  )
}

export default BookDetails