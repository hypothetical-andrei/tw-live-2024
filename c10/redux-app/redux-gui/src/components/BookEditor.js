import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { bookActions } from '../actions'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'

const bookListSelector = state => state.book.bookList

const BookEditor = (props) => {
  const [isAddDialogShown, setIsAddDialogShown] = useState(false)
  const [isNewBook, setIsNewBook] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)

  const bookList = useSelector(bookListSelector, shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(bookActions.getBooks())
  }, [])

  const hideDialog = () => {
    setIsAddDialogShown(false)
  }

  const addNew = () => {
    setTitle('')
    setContent('')
    setSelectedBook(null)
    setIsAddDialogShown(true)
    setIsNewBook(true)
  }

  const saveBook = () => {
    if (isNewBook) {
      dispatch(bookActions.addBook({ title, content }))
    } else {
      dispatch(bookActions.updateBook(selectedBook, { title, content }))
    }
    setIsAddDialogShown(false)
    setTitle('')
    setContent('')
    setSelectedBook(null)
  }

  const deleteBook = (rowData) => {
    console.warn('row data')
    console.warn(rowData)
    dispatch(bookActions.deleteBook(rowData.id))
  }

  const editBook = (rowData) => {
    setSelectedBook(rowData.id)
    setTitle(rowData.title)
    setContent(rowData.content)
    setIsNewBook(false)
    setIsAddDialogShown(true)
  }

  const tableFooter = (
    <div>
      <span>
        <Button label='Add' onClick={addNew} icon='pi pi-plus' />
      </span>
    </div>
  )

  const addDialogFooter = (
    <div>
      <Button label='Save' icon='pi pi-save' onClick={() => saveBook()} />
    </div>
  )

  const opsTemplate = (rowData) => {
    return (
      <>
        <Button icon='pi pi-times' className='p-button-danger' onClick={() => deleteBook(rowData)} />
        <Button icon='pi pi-pencil' className='p-button-warning' onClick={() => editBook(rowData)} />
      </>
    )
  }

  return (
    <>
      <DataTable value={bookList} footer={tableFooter}>
        <Column header='Title' field='title' />
        <Column header='Content' field='content' />
        <Column body={opsTemplate} />
      </DataTable>
      {
        isAddDialogShown ?
          <Dialog
            visible={isAddDialogShown}
            header='add a book'
            footer={addDialogFooter}
            onHide={hideDialog}
          >
            <InputText onChange={(evt) => setTitle(evt.target.value)} value={title} name='title' placeholder='title' />
            <InputText onChange={(evt) => setContent(evt.target.value)} value={content} name='content' placeholder='content' />
          </Dialog>
        :
          null
      }
    </>
  )
}

export default BookEditor
