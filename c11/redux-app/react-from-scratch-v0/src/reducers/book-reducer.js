const INITIAL_STATE = {
  bookList : [],
  error : null,
  fetching : false,
  fetched : false
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'GET_BOOKS_PENDING':
    case 'ADD_BOOK_PENDING':
    case 'UPDATE_BOOK_PENDING':
    case 'DELETE_BOOK_PENDING':
      return  { ...state, error: null, fetching: true, fetched: false }           
    case 'GET_BOOKS_FULFILLED':
    case 'ADD_BOOK_FULFILLED':
    case 'UPDATE_BOOK_FULFILLED':
    case 'DELETE_BOOK_FULFILLED':     
      return { ...state, bookList: action.payload, error: null, fetched: true, fetching: false }
    case 'GET_BOOKS_REJECTED':
    case 'ADD_BOOK_REJECTED':
    case 'UPDATE_BOOK_REJECTED':
    case 'DELETE_BOOK_REJECTED':  
      return { ...state, error: action.payload, fetching: false, fetched: false }
    default:
      break
  }
  return state
}