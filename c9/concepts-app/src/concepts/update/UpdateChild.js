import React, { useEffect, useState } from 'react'

function UpdateChild(props) {
  const [content, setContent] = useState({})
  const { item } = props

  const getPost = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await response.json()
    setContent(data)
  }

  useEffect(() => {
    getPost(item)
  }, [item])

  return (
    <div>
      for {item.id} content is {content.title}
    </div>
  )
}

export default UpdateChild
