import React from 'react'
import Home from './container/Home';
import {SignUp,Login} from './components';
import { Route,Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Home />} />
      <Route path='login' element={<Login/>} />
      <Route path='signup' element={<SignUp/>} />
      <Route />
    </Routes>
  )
}

export default App