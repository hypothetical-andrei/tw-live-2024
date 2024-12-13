import emitter from '../utils/EventEmitter'

const SERVER = 'http://localhost:8080/api'

class ChapterStore {
  constructor (bookId) {
    this.bookId = bookId
    this.data = []
  }

  async getChapters () {
    try {
      const response = await fetch(`${SERVER}/books/${this.bookId}/chapters`)
      if (!response.ok) {
        throw response
      }
      const data = await response.json()
      this.data = data
      console.log('before emit data is ', this.data)
      emitter.emit('GET_CHAPTERS_SUCCESS')
    } catch (err) {
      console.warn(err)
      emitter.emit('GET_CHAPTERS_ERROR')
    }
  }

  async addChapter (chapter) {
    try {
      const response = await fetch(`${SERVER}/books/${this.bookId}/chapters`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chapter)
      })
      if (!response.ok) {
        throw response
      }
      this.getChapters()
    } catch (err) {
      console.warn(err)
      emitter.emit('ADD_BOOK_ERROR')
    }
  }

  async saveChapter (id, chapter) {
    try {
      const response = await fetch(`${SERVER}/books/${this.bookId}/chapters/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chapter)
      })
      if (!response.ok) {
        throw response
      }
      this.getChapters()
    } catch (err) {
      console.warn(err)
      emitter.emit('SAVE_CHAPTER_ERROR')
    }
  }

  async deleteChapter (id) {
    try {
      const response = await fetch(`${SERVER}/books/${this.bookId}/chapters/${id}`, {
        method: 'delete'
      })
      if (!response.ok) {
        throw response
      }
      this.getChapters()
    } catch (err) {
      console.warn(err)
      emitter.emit('DELETE_CHAPTER_ERROR')
    }
  }
}

export default ChapterStore
