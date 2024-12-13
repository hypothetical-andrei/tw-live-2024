import React, { useEffect, useState } from 'react'
import BookAddForm from './BookAddForm'
import Book from './Book'
import store from '../stores/BookStore'
import BookDetails from './BookDetails'

const BookList = () => {
  const [books, setBooks] = useState([])
  const [selected, setSelected] = useState(0)

  const addBook = (book) => {
    store.addBook(book)
  }

  const saveBook = (id, book) => {
    store.saveBook(id, book)
  }

  const deleteBook = (id) => {
    store.deleteBook(id)
  }

  const select = (id) => {
    setSelected(id)
  }

  const cancel = () => {
    setSelected(0)
  }

  useEffect(() => {
    store.getBooks()
    store.emitter.addListener('GET_BOOKS_SUCCESS', () => {
      setBooks(store.data)
    })
  }, [])

  return (
    <>
      {
        selected === 0
          ? (
            <>
              <h6>book list</h6>
              {
                books.map(e => <Book item={e} key={e.id} onSave={saveBook} onDelete={deleteBook} onSelect={select} />)
              }
              <BookAddForm onAdd={addBook} />
            </>
            )
          : (
            <BookDetails item={selected} onCancel={cancel} />
            )
      }
    </>
  )
}

export default BookList
