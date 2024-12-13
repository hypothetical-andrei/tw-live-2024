import React, { useState, useEffect } from 'react'
import ChapterStore from '../stores/ChapterStore'
import Chapter from './Chapter'
import ChapterAddForm from './ChapterAddForm'

const BookDetails = (props) => {
  const { item, onCancel } = props

  const [chapters, setChapters] = useState([])

  const store = new ChapterStore(item)

  const addChapter = (chapter) => {
    store.addChapter(chapter)
  }

  const saveChapter = (id, chapter) => {
    store.saveChapter(id, chapter)
  }

  const deleteChapter = (id) => {
    store.deleteChapter(id)
  }

  const cancel = () => {
    onCancel()
  }

  useEffect(() => {
    store.getChapters()
    store.emitter.addListener('GET_CHAPTERS_SUCCESS', () => {
      setChapters(store.data)
    })
  }, [])

  return (
    <div>
      <h4>
        i am the details page for {item}
      </h4>
      <div>
        {
          chapters.map(e => <Chapter key={e.id} item={e} onSave={saveChapter} onDelete={deleteChapter} />)
        }
      </div>
      <div>
        <ChapterAddForm onAdd={addChapter} />
      </div>
      <div>
        <input type='button' value='cancel' onClick={cancel} />
      </div>
    </div>
  )
}

export default BookDetails
