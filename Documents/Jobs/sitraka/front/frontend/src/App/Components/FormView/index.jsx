import './FormView.css'
import React, { Fragment, useState, useEffect } from 'react'
import { useSetTitle } from '../../Utils'
import { Sidebar, Header } from '../Partials'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import { useNewEmployeeMutation, useEditEmployeeMutation } from '../../Features/api/employeApiSlice'

const FormView = ({ title }) => {

  useSetTitle(title)
  const { id } = useParams()
  const [employe, setEmploye] = useState({})

  const getEmploye = async () => {
    await fetch(`http://localhost:5058/api/Employer/${id}`).then(response => response.json()).then(data => setEmploye(data))
  }

  console.log(employe.nom)

  function handleEdit(values){
    console.log(values)
  }

  function handleSave(values){
    console.log(values)
  }

  const data = { nom: employe.nom }

console.log(data)

  const formik = useFormik({
    initialValues: {
      employerID: data ? data.employerID : '',
      nom: employe ? String(employe.nom) : '',
      prenom: employe ? employe.prenom : '',
      email: employe ? employe.email : '',
      post: employe ? employe.post : '',
      salaire: employe ? employe.salaire : '',
      date: employe ? employe.date : '',
      transport: employe ? employe.transport : false,
      cantine: employe ? employe.cantine : false,
      caps: employe ? employe.caps : false,
      ostie: employe ? employe.ostie : false,
    },
    onSubmit: (values => {
      console.log(values);
      if(values.id){
        handleEdit(values)
        toast.success(' Employée mis a jour !')
      }
      else{
        handleSave(values)
        toast.success('Employée enregistrer !')
      }
    })
  })

  useEffect(() => {
    getEmploye()
  }, [])

  return (
    <Fragment>
      <Sidebar active={'employee'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <form className='form-container' autoComplete='off' onSubmit={formik.handleSubmit}>
            <div className="form-header">
              {id ? <h4 className='form-title'>Modification Employée</h4> : <h4 className='form-title'>Nouveau Employée</h4>}
            </div>
            <input type="hidden" id='employeId' name='emplyeId' onChange={formik.handleChange} value={formik.values.employerID} />
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='firstname'>Nom</label>
                  <input className="input--style-4" type="text" name="firstname" id="firstname" onChange={formik.handleChange} value={formik.values.nom} />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='lastname'>Prénom</label>
                  <input className="input--style-4" type="text" name="lastname" id='lastname' onChange={formik.handleChange} value={formik.values.prenom} />
                </div>
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='email'>Email</label>
                  <input className="input--style-4" type="email" name="email" id='email' onChange={formik.handleChange} value={formik.values.email} />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='post'>Post</label>
                  <select name="post" id="post" onChange={formik.handleChange} value={formik.values.post}>
                    <option value="Directeur">Directeur</option>
                    <option value="administration">Administration</option>
                    <option value="RH">Ressource Humaine</option>
                    <option value="RF">Responsable Financier</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='salary'>Salaire de base</label>
                  <input className="input--style-4" type="number" id='salary' name="salary" min={0} onChange={formik.handleChange} value={formik.values.salaire} />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='takeon'>Date d'embauche</label>
                  <input className="input--style-4" type="date" name="takeon" id='takeon' onChange={formik.handleChange} value={formik.values.takeon} />
                </div>
              </div>
            </div>
            <div className="rowbig">
              <div className="col-max">
                <div className="input-group">
                  <label className="label" htmlFor='advantages'>Avantages</label>
                  <div className="form-group">
                    <div className="select-group">
                      <label className="checkbox-container label"> Transport
                        <input type="checkbox" name='transport' id='transport' onChange={formik.handleChange} value={formik.values.transport} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="checkbox-container label"> Cantine
                        <input type="checkbox" id='cantine' name='cantine' onChange={formik.handleChange} value={formik.values.cantine} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="select-group">
                      <label className="checkbox-container label"> Cnaps
                        <input type="checkbox" id='cnaps' name='cnaps' onChange={formik.handleChange} value={formik.values.caps} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="select-group">
                      <label className="checkbox-container label"> Ostie
                        <input type="checkbox" id='ostie' name='ostie' onChange={formik.handleChange} value={formik.values.ostie} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button className="btn-save" type='submit'>{ id ? 'Modifier' : 'Enregistrer'}</button>
                </div>
              </div>
            </div>
          </form>
          <Toaster position='top-right' toastOptions={{ duration: 2800, style: { background: '#ffffffff', color: 'black', fontWeight:'600', padding: '20px 50px 20px 50px', fontSize: '18px'}}} />
        </div>
      </section>
    </Fragment>
  )
}

export default FormView