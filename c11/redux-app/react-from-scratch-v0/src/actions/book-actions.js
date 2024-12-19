import { SERVER } from '../config/global'

export const GET_BOOKS = 'GET_BOOKS'
export const ADD_BOOK = 'ADD_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const DELETE_BOOK = 'DELETE_BOOK'

export function getBooks() {
  return {
    type: GET_BOOKS,
    payload: async () => {
        let response  = await fetch(`${SERVER}/books`)
        let json = await response.json()
        return json
    }
  }
}

export function addBook(book){
  return {
    type : ADD_BOOK,
    payload : async () => {
        await fetch(`${SERVER}/books`, {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(book)
        })
        let response  = await fetch(`${SERVER}/books`)
        let json = await response.json()
        return json
    }
  }
}

export function updateBook(bookId, book){
  return {
    type : UPDATE_BOOK,
    payload : async () => {
      await fetch(`${SERVER}/books/${bookId}`, {
        method : 'put',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(book)
      })
      let response  = await fetch(`${SERVER}/books`)
      let json = await response.json()
      return json
    }
  }
}

export function deleteBook(bookId){
  return {
    type : DELETE_BOOK,
    payload : async () => {
      await fetch(`${SERVER}/books/${bookId}`, {
        method : 'delete'
      })
      let response  = await fetch(`${SERVER}/books`)
      let json = await response.json()
      return json
    }
  }
}