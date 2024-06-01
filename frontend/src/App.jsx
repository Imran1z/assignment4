import React from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Signup from './pages/Signup'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Tasks from './pages/Tasks'


const App = () => {
  return <BrowserRouter>
  <Header/>
   <Routes>
   <Route path="/" element={<Home/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path='tasks' element={<Tasks/>}/>
    </Route>
   </Routes>

  </BrowserRouter>
}

export default App