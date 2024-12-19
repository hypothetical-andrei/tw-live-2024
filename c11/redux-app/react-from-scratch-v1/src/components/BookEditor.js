import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { bookActions } from '../actions'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'

const bookListSelector = state => state.book.data
const bookCountSelector = state => state.book.count

const BookEditor = (props) => {
  const [isAddDialogShown, setIsAddDialogShown] = useState(false)
  const [isNewBook, setIsNewBook] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(2)
  const [filterField, setFilterField] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [first, setFirst] = useState(0)

  const bookList = useSelector(bookListSelector, shallowEqual)
  const bookCount = useSelector(bookCountSelector, shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(bookActions.getBooks(pageSize, pageNumber, filterField, filterValue, sortField, sortOrder))
  }, [pageNumber, pageSize, filterField, filterValue, sortField, sortOrder])

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

  const onPage = (evt) => {
    setPageNumber(evt.page)
    setPageSize(evt.rows)
    setFirst(evt.first)
  }

  const onSort = (evt) => {
    setSortField(evt.sortField)
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  const onFilter = (evt) => {
    console.warn(evt)
    for (const filter in evt.filters) {
      if (evt.filters[filter].value !== null) {
        setFilterField(filter)
        setFilterValue(evt.filters[filter].value)
        break
      }
    }
  }


  return (
    <>
      <DataTable 
        value={bookList} 
        footer={tableFooter} 
        paginator 
        onPage={onPage} 
        rowsPerPageOptions={[2, 5, 10, 20]}
        totalRecords={bookCount} 
        lazy
        first={first}
        page={pageNumber}
        rows={pageSize}
        onSort={onSort}
        onFilter={onFilter}
        filterDisplay="row"
      >
        <Column header='Title' field='title' sortable filter filterPlaceholder='Search by title' showFilterMenu={false} />
        <Column header='Content' field='content' sortable filter  
          filterPlaceholder='Search by content' showFilterMenu={false}
        />
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
