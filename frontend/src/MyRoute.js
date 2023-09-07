import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import ProductDetailComponent from './component/ProductDetailComponent'
import RegistrationComponent from './ReactForm/RegistrationComponent'

const MyRoute = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}  />
        <Route path='/productdetail/:id' element={<ProductDetailComponent/>}  />
        <Route path='/register' element={<RegistrationComponent/>}  />


    </Routes>
    </BrowserRouter>
  )
}

export default MyRoute