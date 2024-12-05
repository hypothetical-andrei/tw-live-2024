import { SERVER } from './consts.mjs'

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
      } else {
        console.log('could not get data')
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
        await this.getAll()
      } else {
        console.log('could not add item')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async getOne (id) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`)
      if (response.ok) {
        this.item = await response.json()
      } else {
        console.log('could not get data')
      }
    } catch (err) {
      console.warn(err)
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
        await this.getAll()
      } else {
        console.log('could not update item')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async deleteOne (id) {
    try {
      const response = await fetch(`${SERVER}/books/${id}`, {
        method: 'delete'
      })
      if (response.ok) {
        await this.getAll()
      } else {
        console.log('could not update item')
      }
    } catch (err) {
      console.warn(err)
    }
  }
}

const store = new DataStore()

export default store