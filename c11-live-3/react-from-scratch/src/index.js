import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import store from './stores'
import { Provider } from 'react-redux'


import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)