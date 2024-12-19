import React, { useState, useEffect } from 'react'
import Book from './Book'
import store from '../store/BookStore'
import BookAddForm from './BookAddForm'
import BookDetails from './BookDetails'

const BookList = () => {
  const [ books, setBooks ] = useState([])
  const [ selected, setSelected ] = useState(0)

  useEffect(() => {
    store.getAll()
    store.emitter.addListener('GET_BOOKS_SUCCESS', () => {
      setBooks(store.data)
    })
  }, [])

  const addBook = (item) => {
    store.addOne(item)
  }

  const saveBook = (id, item) => {
    store.saveOne(id, item)
  }

  const deleteBook = (id) => {
    store.deleteOne(id)
  }

  const selectBook = (id) => {
    setSelected(id)
  }

  const cancelSelection = () => {
    setSelected(0)
  }

  return (
    <div>
      {
        selected === 0
        ? (
          <>
            {
              books.map(e => <Book item={e} key={e.id} onSave={saveBook} onDelete={deleteBook} onSelect={selectBook} />)
            }
            <div>
              <BookAddForm onAdd={addBook} />
            </div>
          </>
        ) : (
          <BookDetails itemId={selected} onCancel={cancelSelection} />
        )
      }
      
    </div>
  )
}

export default BookList