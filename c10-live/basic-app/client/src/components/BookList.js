import React, { useState, useEffect } from 'react'
import store from '../stores/BookStore'
import Book from './Book'
import BookAddForm from './BookAddForm'
import BookDetails from './BookDetails'

const BookList = () => {
  const [books, setBooks] = useState([])
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    store.getBooks()
    store.emitter.addListener('GET_BOOKS_SUCCESS', () => {
      setBooks(store.data)
    })
  }, [])

  const addBook = (book) => {
    store.addBook(book)
  }

  const deleteBook = (id) => {
    store.deleteBook(id)
  }

  const saveBook = (id, book) => {
    store.saveBook(id, book)
  }

  const select = (id) => {
    setSelected(id)
  }

  const cancel = () => {
    setSelected(0)
  }

  return (
    <div>
      {
        selected === 0
        ? (
          <>
            <h2>Book list</h2>
            {
              books.map(e => <Book item={e} key={e.id} onDelete={deleteBook} onSave={saveBook} onSelect={select} />)
            }
            <BookAddForm onAdd={addBook} />
          </>
        ) : (
          <BookDetails item={selected} onCancel={cancel} />
        )
      }
    
    </div>
  )
}

export default BookList