import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog' 
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import actions from '../actions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const bookListSelector = state => state.book.data
const bookCountSelector = state => state.book.count

const BookEditor = () => {
  const bookList = useSelector(bookListSelector, shallowEqual)
  const bookCount = useSelector(bookCountSelector, shallowEqual)
  const [isDialogShown, setIsDialogShown] = useState(false)
  const [isNewBook, setIsNewBook] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(2)
  const [filterField, setFilterField] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [first, setFirst] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.bookActions.getBooks(pageSize, pageNumber, filterField, filterValue, sortField, sortOrder))
  }, [pageNumber, pageSize, filterField, filterValue, sortField, sortOrder])
  
  const hideDialog = () => {
    setIsDialogShown(false)
  }

  const addNew = () => {
    setTitle('')
    setContent('')
    setSelectedBook(null)
    setIsDialogShown(true)
    setIsNewBook(true)
  }

  const tableFooter = (
    <div>
      <span>
        <Button label='Add' onClick={addNew} icon='pi pi-plus' />
      </span>
    </div>
  )

  const deleteBook = (rowData) => {
    dispatch(actions.bookActions.deleteBook(rowData.id))
  }

  const editBook = (rowData) => {
    setSelectedBook(rowData.id)
    setTitle(rowData.title)
    setContent(rowData.content)
    setIsNewBook(false)
    setIsDialogShown(true)
  }


  const opsTemplate = (rowData) => {
    return (
      <>
        <Button icon='pi pi-times' className='p-button-danger' onClick={() => deleteBook(rowData)} />
        <Button icon='pi pi-pencil' className='p-button-warning' onClick={() => editBook(rowData)} />
      </>
    )
  }

  const saveBook = () => {
    if (isNewBook) {
      dispatch(actions.bookActions.addBook({ title, content }))
    } else {
      dispatch(actions.bookActions.updateBook(selectedBook, { title, content }))
    }
    setIsDialogShown(false)
    setTitle('')
    setContent('')
    setSelectedBook(null)
  }

  const addDialogFooter = (
    <div>
      <Button label='Save' icon='pi pi-save' onClick={() => saveBook()} />
    </div>
  )

  const handlePage = (evt) => {
    setPageNumber(evt.page)
    setPageSize(evt.rows)
    setFirst(evt.first)
  }

  const handleSort = (evt) => {
    setSortField(evt.sortField)
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  const handleFilter = (evt) => {
    let allNull = true
    for (const filter in evt.filters) {
      if (evt.filters[filter].value !== null) {
        setFilterField(filter)
        setFilterValue(evt.filters[filter].value)
        allNull = false
        break
      }
    }
    if (allNull) {
      setFilterField('')
      setFilterValue('')
    }
  }

  return (
    <div>
      <DataTable
        value={bookList}
        footer={tableFooter}
        paginator
        lazy
        rowsPerPageOptions={[2, 5, 10, 20]}
        rows={pageSize}
        totalRecords={bookCount}
        onPage={handlePage}
        first={first}
        onSort={handleSort}
        onFilter={handleFilter}
        filterDisplay='row'
      >
        <Column header='Title' field='title' sortable filter showFilterMenu={false} />
        <Column header='Content' field='content' sortable filter showFilterMenu={false} />
        <Column body={opsTemplate} />
      </DataTable>
      {
        isDialogShown ?
          <Dialog
            visible={isDialogShown}
            header='add a book'
            onHide={hideDialog}
            footer={addDialogFooter}
          >
            <InputText onChange={(evt) => setTitle(evt.target.value)} value={title} name='title' placeholder='title'  />
            <InputText onChange={(evt) => setContent(evt.target.value)} value={content} name='content' placeholder='content'   />
          </Dialog>
        :
          null
      }
    </div>
  )
}

export default BookEditor