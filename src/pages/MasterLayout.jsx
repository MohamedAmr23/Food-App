import React from 'react'
import Navbar from '../sharedComponent/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../sharedComponent/SideBar'
import Header from '../sharedComponent/Header'

const MasterLayout = () => {
  return (
    <div className="d-flex">
      <SideBar />
      <div className='w-100'>
        <Navbar />
        <Header/>
        <Outlet />
      </div>

      <div />
    </div>
  );
}

export default MasterLayout