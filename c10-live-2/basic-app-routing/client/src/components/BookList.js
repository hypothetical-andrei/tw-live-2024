import React, { useEffect, useState } from 'react'
import BookAddForm from './BookAddForm'
import Book from './Book'
import store from '../stores/BookStore'
import { navigateTo } from '../utils/navigate-to'
import emitter from '../utils/EventEmitter'

const BookList = () => {
  const [books, setBooks] = useState([])

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
    navigateTo(`/details?id=${id}`)
  }


  useEffect(() => {
    store.getBooks()
    emitter.addListener('GET_BOOKS_SUCCESS', () => {
      setBooks(store.data)
    })
  }, [])

  return (
    <>
      <h6>book list</h6>
        {
          books.map(e => <Book item={e} key={e.id} onSave={saveBook} onDelete={deleteBook} onSelect={select} />)
        }
        <BookAddForm onAdd={addBook} />
    </>
  )
}

export default BookList
