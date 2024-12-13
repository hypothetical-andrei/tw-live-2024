import React, { useState, useEffect } from 'react'
import store from '../stores/BookStore'
import Book from './Book'
import BookAddForm from './BookAddForm'
import BookDetails from './BookDetails'

const BookList = () => {
  const [books, setBooks ] = useState([]) 
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    store.getAll()
    store.emitter.addListener('GET_BOOKS_SUCCESS', () => {
      setBooks(store.data)
    })
  }, [])

  const addItem = (item) => {
    store.addOne(item)
  }

  const saveItem = (id, item) => {
    store.saveOne(id, item)
  }

  const deleteItem = (id) => {
    store.deleteOne(id)
  }

  const select = (id) => {
    setSelected(id)
  }

  const cancel = () => {
    setSelected(0)
  }

  return (
    <div>
      <h3>Book list</h3>
      {
        selected === 0
        ? (
          <>
            {
              books.map(e => <Book item={e} key={e.id} onSave={saveItem} onDelete={deleteItem} onSelect={select} />)
            }
            <div>
              <BookAddForm onAdd={addItem} />
            </div>
          </>
        ) : (
          <BookDetails item={selected} onCancel={cancel} />
        )
      }
     
    </div>
  )
}

export default BookList