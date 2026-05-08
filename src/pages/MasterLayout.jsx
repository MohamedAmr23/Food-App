import React, { useState } from 'react'
import Navbar from '../sharedComponent/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../sharedComponent/SideBar'
import Header from '../sharedComponent/Header'
import HeaderCard from '../sharedComponent/HeaderCard'
const MasterLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="d-flex">
      <div >
        <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      </div>
      
      <div className='w-100'  style={{ marginLeft: isSidebarOpen ? '80px' : '250px', width: '100%', transition: 'margin 0.3s' }}>
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