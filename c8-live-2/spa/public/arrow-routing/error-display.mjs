import { reactive, html } from 'https://esm.sh/@arrow-js/core'
import dataStore from './data-store.mjs'

const { eventManager } = dataStore

const data = reactive({
  error: '',
  isShown: false
})

const dataErrorHandler = (evt) => {
  data.error = evt.type
  data.isShown = true
  setTimeout(() => {
    data.isShown = false
  }, 5000)
}

const possibleErrors = ['ADD_ONE_ERROR', 'UPDATE_ONE_ERROR', 'DELETE_ONE_ERROR', 'GET_ONE_ERROR', 'GET_ALL_ERROR']

possibleErrors.forEach((e) => {
  eventManager.removeEventListener(e, dataErrorHandler)
  eventManager.addEventListener(e, dataErrorHandler)
})


const errorDetails = html`
  <div>${() => data.isShown ? html`Error: ${() => data.error}`: ''}</div>
`


export default { template: errorDetails }