import EventEmitter from '../utils/EventEmitter'

const SERVER = 'http://localhost:8080/api'

class BookStore {
  constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll () {
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

  async addOne (item) {
    try {
      const response = await fetch(`${SERVER}/books`, {
        method: 'post',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw response
      }
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_BOOK_ERROR')
    }
  }

  async saveOne (id, item) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`, {
        method: 'put',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw response
      }
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_BOOK_ERROR')
    }
  }

  async deleteOne (id, item) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`, {
        method: 'delete'
      })
      if (!response.ok) {
        throw response
      }
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_BOOK_ERROR')
    }
  }
}

const store = new BookStore()

export default store