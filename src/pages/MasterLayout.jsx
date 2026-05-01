import React from 'react'
import Navbar from '../sharedComponent/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../sharedComponent/SideBar'
import Header from '../sharedComponent/Header'
import HeaderCard from '../sharedComponent/HeaderCard'
const MasterLayout = () => {
  return (
    <div className="d-flex">
      <div className=''>
        <SideBar/>
      </div>
      
      <div className='w-100'>
        <Navbar/>
        <Header/>
        {/* <HeaderCard/> */}
        <Outlet />
      </div>

      <div />
    </div>
  );
}

export default MasterLayout