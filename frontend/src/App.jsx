import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Audition from './pages/Audition'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/audition' element={<Audition />} />
      </Routes>
    </div>
  )
}

export default App