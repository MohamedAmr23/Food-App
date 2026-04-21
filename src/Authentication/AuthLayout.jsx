import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
export default function AuthLayout() {
  const {pathname} = useLocation()
  const isRegister = pathname==='/register'
  return (
    <div   className='auth-container'>
      <div className='container-fluid bg-overlay'>
        <div className='row vh-100 justify-content-center align-items-center'>
          <div className={`${isRegister ?'col-lg-10 py-5':'col-lg-5 py-3'} col-md-6 bg-white rounded rounded-2 px-5 `}>
            <div className='logo-container text-center my-2 mt-4'>
              <img className={isRegister?'w-40':'w-75'} src={logo} alt="logo" />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}