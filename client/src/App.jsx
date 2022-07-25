// import React, { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ClienteForm from './components/Cliente'
import MembresiaForm from './components/Membresia'
import MembresiaList from './components/MembresiaList'
import PlanForm from './components/Plan'
import PlanList from './components/PlanList'


function App() {


  return (

 
    <div>

      <Navbar/>
        <BrowserRouter>
          <Routes>

            <Route  path="/" element={ <Home />} />
            <Route path='/cliente/new' element={<ClienteForm/>} />
            <Route path='/cliente/:cliente_id/edit' element={<ClienteForm/>}/>
            <Route path='/membresias' element={<MembresiaList />} />
            <Route path='/membresia/new' element={<MembresiaForm/>} />
            <Route path='/membresia/:membresia_id/edit' element={<MembresiaForm/>}/>
            <Route path='/planes' element={<PlanList />} />
            <Route path='/plan/new' element={<PlanForm/>} />
            <Route path='/plan/:plan_id/edit' element={<PlanForm/>}/>
          </Routes>

        </BrowserRouter>
    </div>
  )
}

export default App
