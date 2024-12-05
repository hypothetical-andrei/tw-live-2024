import React from 'react'

class PropsChild extends React.Component {
  render () {
    const { item } = this.props
    return (
      <div>
        item {item.description} with id {item.id}
      </div>
    )
  }
}

export default PropsChild
