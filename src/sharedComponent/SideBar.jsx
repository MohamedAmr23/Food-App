import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import sidebarImage from '../assets/image-sidebar.png'
import { Link, useNavigate } from 'react-router-dom';
import ChangePassword from '../Authentication/ChangePassword';
import { UserContext } from '../context/UserContext';
import { set } from 'react-hook-form';
const SideBar = ({isSidebarOpen , setIsSidebarOpen}) => {
  const [isCollapsed , setIsCollapsed] = useState(false)
  const [isShowChangePassword , setIsShowChangePassword] = useState(false)
  const {userData} = useContext(UserContext)
  const navigate = useNavigate()
  const logOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1000 }}>
      <Sidebar collapsed={isCollapsed}  style={{height:'100vh' , color:'#fff'  }} >
        <div className='text-center my-5' onClick={()=>toggleSidebar()}>
          <img  src={sidebarImage} alt="sidebar" className={`${isCollapsed?'w-100':''}`}  />
        </div>
        <Menu className='px-1 pb-4'>
          <MenuItem icon={<i className="fa fa-home "></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
          {userData?.userGroup === 'SuperAdmin' && (
            <MenuItem icon={<i className="fa fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
          )}
         
          <MenuItem icon={<i className="fa fa-utensils"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
           {userData?.userGroup === 'SuperAdmin' && (
            <MenuItem icon={<i className="fa fa-tags"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
          )}

         {userData?.userGroup === 'SystemUser' && (
            <MenuItem icon={<i className="fa fa-home"></i>} component={<Link to="/dashboard/favorites" />}> favorites </MenuItem>
          )}
          <MenuItem icon={<i className="fa fa-key"></i>}  onClick={()=>setIsShowChangePassword((prev)=>!prev)}> Change Password </MenuItem> 
          {isShowChangePassword && (
          <ChangePassword
            asModal={true}
            onClose={() => setIsShowChangePassword(false)}
          />
        )}
          <MenuItem onClick={logOut} icon={<i className="fa fa-sign-out-alt"></i>}> Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideBar