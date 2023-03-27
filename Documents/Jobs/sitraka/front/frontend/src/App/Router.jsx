import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomeView, ListView, FormView, ErrorPage, DetailView } from './Components'

const Routers = () => {

  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route path='/employee'>
        <Route index element={<ListView />} />
        <Route path='new' element={<FormView title='New Employee' />} />
        <Route path='edit/:id' element={<FormView title='Edit Employee' />} />
        <Route path='detail/:id' element={<DetailView title='Employee detail' />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )

}

export default Routers