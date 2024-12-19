import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './Main'
import Item from './Item'

function App () {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Main />
        </Route>
        <Route path='/:item' exact>
          <Item />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
