import { SERVER } from './consts.mjs'
import eventManager from './emitter.mjs' 

class DataStore { 
  constructor () {
    this.data = []
    this.item = null
  }

  async getAll () {
    try {
      const response = await fetch(`${SERVER}/books`)
      if (response.ok) {
        this.data = await response.json()
        eventManager.dispatch('GET_ALL_SUCCESS')
      } else {
        eventManager.dispatch('GET_ALL_ERROR')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async addOne (item) {
    try {
      const response = await fetch(`${SERVER}/books`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      if (response.ok) {
        this.getAll()
      } else {
        eventManager.dispatch('ADD_ONE_ERROR')
      }
    } catch (err) {
      eventManager.dispatch('ADD_ONE_ERROR')
    }
  }

  async getOne (id) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`)
      if (response.ok) {
        this.item = await response.json()
        eventManager.dispatch('GET_ONE_SUCCESS')
      } else {
        eventManager.dispatch('GET_ONE_ERROR')
      }
    } catch (err) {
      eventManager.dispatch('GET_ONE_ERROR')
    }
  }

  async updateOne (id, item) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      if (response.ok) {
        this.getAll()
      } else {
        eventManager.dispatch('UPDATE_ONE_ERROR')
      }
    } catch (err) {
      eventManager.dispatch('UPDATE_ONE_ERROR')
    }
  }

  async deleteOne (id) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`, {
        method: 'delete'
      })
      if (response.ok) {
        this.getAll()
      } else {
        eventManager.dispatch('DELETE_ONE_ERROR')
      }
    } catch (err) {
      eventManager.dispatch('DELETE_ONE_ERROR')
    }
  }
}

const store = new DataStore()

export default { store, eventManager }