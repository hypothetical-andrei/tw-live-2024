import { reactive, html } from 'https://esm.sh/@arrow-js/core'
import dataStore from './data-store.mjs'
import errorDetails from './error-display.mjs'

const { store, eventManager } = dataStore

const data = reactive({
  books: [],
  bookCandidate: {
    title: '',
    content: ''
  },
  selected: -1
})

const dataLoadedHandler = () => {
  data.books = store.data
}

eventManager.removeEventListener('GET_ALL_SUCCESS', dataLoadedHandler)
eventManager.addEventListener('GET_ALL_SUCCESS', dataLoadedHandler)

const update = async () => {
  store.getAll()
}

const addItem  = async () => {
  await store.addOne(data.bookCandidate)
}

const deleteItem = async (id) => {
  await store.deleteOne(id)
}

const saveItem = async (id) => {
  await store.updateOne(id, data.bookCandidate)
  data.selected = -1
}

const select = (id) => {
  data.selected = id
}

const cancel = () => {
  data.selected = -1
}

const bookForm = html`<div>
  <input type=text id=titleInput placeholder=title @input="${e => { data.bookCandidate.title = e.target.value }}" />
  <input type=text id=contentInput placeholder=content @input="${e => { data.bookCandidate.content = e.target.value }}"/>
  <input type=button value=add @click="${() => { addItem() }}" />
</div>`

const bookRows = html`
  <div>
    ${() => data.books.map(e => {
        if (e.id === data.selected) {
          return html `<div>
            <input type=text id=titleInput placeholder=title @input="${e => { data.bookCandidate.title = e.target.value }}" value="${e.title}" />
            <input type=text id=contentInput placeholder=content @input="${e => { data.bookCandidate.content = e.target.value }}" value="${e.content}" />
            <input type=button value=save @click="${() => saveItem(e.id)}" />
            <input type=button value=cancel @click="${() => cancel(e.id)}" />
          </div>`
        } else {
          return html`<div>
            ${e.title} contains ${e.content}
            <input type=button value=edit @click="${() => select(e.id)}" />
            <input type=button value=delete @click="${() => deleteItem(e.id)}" />
          </div>`
        }
      })
    }
  </div>
`

const bookTemplate = html`
  <h2>List of books</h2>
  ${bookRows}
  ${bookForm}
  ${errorDetails.template}
`

update()

export default { template: bookTemplate, update }