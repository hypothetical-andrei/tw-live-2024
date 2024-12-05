import { reactive, html } from 'https://esm.sh/@arrow-js/core'
import dataStore from './data-store.mjs'

const { store, eventManager } = dataStore

const data = reactive({
  book: {
    id: -1,
    title: '',
    content: ''
  }
})

const dataLoadedHandler = () => {
  data.book = store.item
}

eventManager.removeEventListener('GET_ONE_SUCCESS', dataLoadedHandler)
eventManager.addEventListener('GET_ONE_SUCCESS', dataLoadedHandler)

const update = async () => {
  const param = window.location.hash.split('/').pop()
  store.getOne(param)
}

const bookDetails = html`
  <h2>Item details for ${() => data.book?.id}</h2>
  <div>Title: ${() => data.book?.title}</div>
  <div>Content: ${() => data.book?.content}</div>
`

update()

export default { template: bookDetails, update }