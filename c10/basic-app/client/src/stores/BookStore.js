import EventEmitter from '../utils/EventEmitter'

const SERVER = 'http://localhost:8080/api'

class BookStore {
  constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getBooks () {
    try {
      const response = await fetch(`${SERVER}/books`)
      if (!response.ok) {
        throw response
      }
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_BOOKS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_BOOKS_ERROR')
    }
  }

  async addBook (book) {
    try {
      const response = await fetch(`${SERVER}/books`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      if (!response.ok) {
        throw response
      }
      this.getBooks()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_BOOK_ERROR')
    }
  }

  async saveBook (id, book) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      if (!response.ok) {
        throw response
      }
      this.getBooks()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_BOOK_ERROR')
    }
  }

  async deleteBook (id) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`, {
        method: 'delete'
      })
      if (!response.ok) {
        throw response
      }
      this.getBooks()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_BOOK_ERROR')
    }
  }
}

const store = new BookStore()

export default store
