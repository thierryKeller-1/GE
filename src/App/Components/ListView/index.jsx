import './ListView.css'
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";
import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useSetTitle } from '../../Utils'
import { Header, Sidebar } from '../Partials'
import { Link, useNavigate } from 'react-router-dom'
import Swall from 'sweetalert2'
import { ReactTabulator, reactFormatter } from "react-tabulator";
import data from './data'
import { FaTrashAlt, FaEdit, FaListAlt, FaPlusCircle } from 'react-icons/fa'
// import { useGetEmployeListQuery } from '../../Features/api/employeApiSlice'

function SimpleOptions(props) {
  const rowData = props.cell._cell.row.data;

  return (
    <div className='btnOptions'>
      <button className='green' onClick={() => props.handlers.handleDetail(rowData.employerID)}><FaListAlt /></button>
      <button className='orange' onClick={() => props.handlers.handleEdit(rowData.employerID)}><FaEdit /></button>
      <button className='red' onClick={() => props.handlers.handleDelete(rowData.employerID)}><FaTrashAlt /></button>
    </div>
  )
}

const ListView = ({ title }) => {

  const searchRef = useRef()
  useSetTitle('Employee List')

  const [TableData, setTableData] = useState([])
  // const { employes , isLoading, isSuccess, error } = useGetEmployeListQuery()

  const handleSearch = (e) => {
    e.preventDefault()
    const searchRefValue = searchRef.current.value
    if (searchRefValue !== '') {
      const filteredData = data.filter(data => {
        return data.firstname.toLowerCase() === searchRefValue.toLowerCase() ||
          data.lastname.toLowerCase() === searchRefValue.toLowerCase() ||
          data.email.toLowerCase() === searchRefValue.toLowerCase() ||
          data.post.toLowerCase() === searchRefValue.toLowerCase() ||
          data.takeon.toLowerCase() === searchRefValue.toLowerCase() ||
          data.salary.toLowerCase() === searchRefValue.toLowerCase()
      })
      filteredData ? setTableData(filteredData) : setTableData([])
    } else {
      setTableData(data)
    }
  }

  const navigate = useNavigate()

  const handleEdit = (id) => {
    navigate(`/employee/edit/${id}`)
  }

  const handleDetail = (id) => {
    navigate(`/employee/detail/${id}`)
  }

  const handleDelete = (id) => {
    Swall.fire('Are you sure to delete it')
  }

  const handlers = {
    handleEdit,
    handleDetail,
    handleDelete
  }

  const columms = [
    { title: 'Nom', field: 'nom' },
    { title: 'Prenom', field: 'prenom' },
    { title: 'Email', field: 'email' },
    { title: 'Salaire', field: 'salaire' },
    { title: 'Date', field: 'date' },
    { title: 'Post', field: 'post' },
    { title: 'options', field: 'id', formatter: reactFormatter(<SimpleOptions handlers={handlers} />) }
  ]

  const getEmployes = async () => {
    await fetch(`http://localhost:5058/api/Employer/`).then(response => response.json()).then(data => setTableData(data))
  }

  useEffect(() => {
    getEmployes()
  }, [])

  return (
    <Fragment>
      <Sidebar active={'employee'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <div className='table-container'>
            <div className="table-title-container">
              <h4 className='table-title'>Liste des Employees</h4>
            </div>
            <div className="table-header">
              <Link to={'/employee/new'}>
                <button className="addnewEmploye"><FaPlusCircle /></button>
              </Link>
              <input type="search" name="search" placeholder='recherche...' onChange={handleSearch} className='search' ref={searchRef} />
            </div>
            <ReactTabulator
              data={TableData}
              columns={columms}
              options={
                {
                  pagination: 'local',
                  paginationSize: 10,
                  paginationSizeSelector: [25, 50, 100]
                }
              }
            />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default ListView