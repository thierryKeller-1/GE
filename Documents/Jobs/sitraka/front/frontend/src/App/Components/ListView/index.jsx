import './ListView.css'
import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react'
import { useSetTitle } from '../../Utils'
import { Header, Sidebar } from '../Partials'
import { Link, useNavigate } from 'react-router-dom'
import Swall from 'sweetalert2'
import { FaTrashAlt, FaEdit, FaListAlt, FaPlusCircle } from 'react-icons/fa'
import { useGetEmployeListQuery, useDeleteEmployeeMutation } from '../../Features/api/employeApiSlice'
import toast, { Toaster } from 'react-hot-toast';
import MaterialReactTable from 'material-react-table';
import { useDispatch } from 'react-redux'
import { employeApiSlice } from '../../Features/api/employeApiSlice'


const ListView = ({ title }) => {

  const searchRef = useRef()
  const dispatch = useDispatch()
  useSetTitle(title)
  // const [tableData, setTableData] = useState([])

  const { data: employes, isLoading, isSuccess, isError } = useGetEmployeListQuery()
  const [deleteEmploye, { isLoadingDelete, isSuccessDeleted, isErrorDeleted }] = useDeleteEmployeeMutation()
  const [rowSelection, setRowSelection] = useState({});
  const navigate = useNavigate()

  const handleEdit = (id) => {
    navigate(`/employee/edit/${id}`)
  }

  const handleDetail = (id) => {
    navigate(`/employee/detail/${id}`)
  }

  const handleDelete = (id) => {
    Swall.fire({
      icon: 'warning',
      title: 'Are you sure to delete it ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        if(isSuccessDeleted){
          const response = deleteEmploye(id).unwrap()
          if(response.status===200){
            dispatch(employeApiSlice.endpoints.getEmployeList.initiate())
            toast.success('delete successfully !')
          }else{
            toast.error('error has occured !')
          }
        }
      }
    })
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstname',
        header: 'First Name',
      },
      {
        accessorKey: 'lastname',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'post',
        header: 'Post',
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
      },
    ],
    [],
  );

  const handlers = {
    handleEdit,
    handleDetail,
    handleDelete
  }


  // const getEmployes = async () => {
  //   await fetch(`http://127.0.0.1:8000/api/employe/all/`)
  //     .then(response => response.json())
  //     .then(data => setTableData([...data]))
  // }

  // useEffect(() => {
  //   getEmployes()
  // }, [])

  const loadingComponent = <div> loading...</div>

  const errorComponent = <div> Failed to fetch data !</div>

  return (
    <Fragment>
      <Sidebar active={'employee'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <div className='table-container'>
            <div className="table-title-container">
              <h4 className='table-title'>Employe List</h4>
            </div>
            {isLoading && <div style={{ textAlign: 'center' }}>getting data ...</div>}
            {isSuccess && <MaterialReactTable columns={columns} data={employes ? employes : []}
              enableColumnActions
              enableRowActions
              positionActionsColumn="last"
              enableRowSelection
              getRowId={(row) => row.id}
              onRowSelectionChange={setRowSelection}
              state={{ rowSelection }}
              renderTopToolbarCustomActions={() => (
                <Link to={'/employee/new'}>
                <button className="addnewEmploye"><FaPlusCircle /></button>
                </Link>
              )}
              muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleSelectedHandler(),
                sx: { cursor: 'pointer' },
              })}
              renderRowActions={({ row }) => (
                <div className='btnOptions'>
                  <button className='green' onClick={() => handlers.handleDetail(row.getValue('id'))}><FaListAlt /></button>
                  <button className='orange' onClick={() => handlers.handleEdit(row.getValue('id'))}><FaEdit /></button>
                  <button className='red' onClick={() => handlers.handleDelete(row.getValue('id'))}><FaTrashAlt /></button>
                </div>
              )} />}
            {isError && <div style={{ textAlign: 'center' }}>Error has occured</div>}
            <Toaster position='top-right' toastOptions={{ duration: 2800, style: { background: '#ffffffff', color: 'black', fontWeight: '600', padding: '20px 50px 20px 50px', fontSize: '18px' } }} />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default ListView