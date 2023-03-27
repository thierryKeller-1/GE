import './DetailView.css'
import React, { Fragment, useState, useEffect } from 'react'
import { Header, Sidebar } from '../Partials'
import { useSetTitle } from '../../Utils'
import { FaCheckSquare, FaSquareFull } from 'react-icons/fa'
import { useGetEmployeDetailQuery } from '../../Features/api/employeApiSlice'
import { useParams } from 'react-router-dom'

const DetailView = ({ title }) => {

  useSetTitle(title)
  const [employee, setEmployeDetail] = useState('')

  const { id } = useParams()

  // const {data: employees , isLoading, isError } = useGetEmployeDetailQuery(id)

  // console.log(employees)

  const getDetail = async () => {
    await fetch(`http://localhost:5058/api/Employer/${id}`).then(response => response.json()).then(data => setEmployeDetail(data))
  }

  useEffect(() => {
    getDetail()
  }, [])

  return (
    <Fragment>
      <Sidebar active={'employee'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <div className='table-container'>
            <div className="table-title-container">
              <h4 className='table-title'>Employee detail</h4>
            </div>
            <div className="data-container">
              <div className="panel-left">
                <div className="data-row">
                  <div className="data-label">First name </div>
                  <div className="data-value">{employee.nom ? employee.nom : 'Non defini'}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Email</div>
                  <div className="data-value">{employee.email ? employee.email : 'Non defini'}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Salaire de base</div>
                  <div className="data-value">{employee.salaire ? employee.salaire : 'Non defini'}</div>
                </div>
              </div>
              <div className="panel-right">
                <div className="data-row">
                  <div className="data-label">Last name</div>
                  <div className="data-value">{employee.prenom ? employee.prenom : 'Non defini'}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Post</div>
                  <div className="data-value">{employee.poste ? employee.poste : 'Non defini'}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Date d'embauche</div>
                  <div className="data-value">{employee.date ? employee.date : 'Non defini'}</div>
                </div>
              </div>
            </div>
            <div className="data-row-max">
              <div className="data-row">
                <div className="data-label">Avantages</div>
                <div className="avantages">
                  <div className="av-item">
                    {employee.caps ? <FaCheckSquare className='checked' /> : <FaSquareFull className='unchecked' />}
                    <div className="data-value">Cnaps</div>
                  </div>
                  <div className="av-item">
                    {employee.transport ? <FaCheckSquare className='checked' /> : <FaSquareFull className='unchecked' />}
                    <div className="data-value">Ostie</div>
                  </div>
                  <div className="av-item">
                    {employee.ostie ? <FaCheckSquare className='checked' /> : <FaSquareFull className='unchecked' />}
                    <div className="data-value">Cantine</div>
                  </div>
                  <div className="av-item">
                    {employee.cantine ? <FaCheckSquare className='checked' /> : <FaSquareFull className='unchecked' />}
                    <div className="data-value">Transport</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default DetailView