import React, { useState, useEffect, useRef } from 'react'
import useRoute from '../../hooks/use-route'
import ChapterStore from '../stores/ChapterStore'
import Chapter from './Chapter'
import ChapterAddForm from './ChapterAddForm'
import emitter from '../utils/EventEmitter'

const BookDetails = () => {
  const { path, params } = useRoute()

  const [chapters, setChapters] = useState([])

  const storeRef = useRef(new ChapterStore(params.id))

  const addChapter = (chapter) => {
    storeRef.current.addChapter(chapter)
  }

  const saveChapter = (id, chapter) => {
    storeRef.current.saveChapter(id, chapter)
  }

  const deleteChapter = (id) => {
    storeRef.current.deleteChapter(id)
  }

  const cancel = () => {
    onCancel()
  }

  useEffect(() => {
    storeRef.current.getChapters()
    emitter.removeAllListeners('GET_CHAPTERS_SUCCESS')
    emitter.addListener('GET_CHAPTERS_SUCCESS', () => {
      console.log('store data is ', storeRef.current.data)
      setChapters(storeRef.current.data)
    })
  }, [])

  return (
    <div>
      <h4>
        i am the details page for {params.id}
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
