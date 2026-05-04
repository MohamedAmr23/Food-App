import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import sidebarImage from '../assets/image-sidebar.png'
import { Link, useNavigate } from 'react-router-dom';
import ChangePassword from '../Authentication/ChangePassword';
const SideBar = () => {
  const [isCollapsed , setIsCollapsed] = useState(false)
  const [isShowChangePassword , setIsShowChangePassword] = useState(false)
  const navigate = useNavigate()
  const logOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <Sidebar collapsed={isCollapsed}  style={{height:'100vh' , color:'#fff'  }} >
        <div className='text-center my-5' onClick={()=>setIsCollapsed(!isCollapsed)}>
          <img  src={sidebarImage} alt="sidebar" className={`${isCollapsed?'w-100':''}`}  />
        </div>
        <Menu className='px-1 pb-4'>
          <MenuItem icon={<i className="fa fa-home "></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
          <MenuItem icon={<i className="fa fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
          <MenuItem icon={<i className="fa fa-utensils"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
          <MenuItem icon={<i className="fa fa-tags"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
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