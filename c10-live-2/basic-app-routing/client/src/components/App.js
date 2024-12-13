import React from 'react'
import useRoute from '../../hooks/use-route'
import BookList from './BookList'
import BookDetails from './BookDetails'

const App = () => {
  const { path, params } = useRoute()

  const routes = {
    '/books': <BookList />,
    '/details/\?.*': <BookDetails id={params.id} />,
  }

  const pathMatch = Object.keys(routes).find(route => new RegExp(`^${route}$`).test(path))

  return routes[pathMatch] || <div>Not Found</div>

}

export default App
