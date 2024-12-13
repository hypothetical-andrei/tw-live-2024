// import React from 'react'

// class PropsChild extends React.Component {
//   render () {
//     const { item } = this.props
//     return (
//       <div>
//         item {item.description} with id {item.id}
//       </div>
//     )
//   }
// }

// export default PropsChild
import React from 'react'

const PropsChild = (props) => {
  const { item } = props

  return (
    <div>
      item {item.description} with id {item.id}
    </div>
  )
}

export default PropsChild
