import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import sidebarImage from '../assets/image-sidebar.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const SideBar = ({ isCollapsed, setIsCollapsed, isMobile, onClose }) => {
  const { userData } = useContext(UserContext)
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const toggleCollapse = () => {
    if (isMobile) {
      onClose()
    } else {
      setIsCollapsed(prev => !prev)
    }
  }

  const handleMenuClick = () => {
    if (isMobile) onClose()
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Sidebar
        collapsed={!isMobile && isCollapsed}
        style={{ height: '100vh', color: '#fff' }}
      >
        {/* ── Logo / Toggle ── */}
        <div
          className="text-center py-5 px-2"
          onClick={toggleCollapse}
          style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <img
            src={sidebarImage}
            alt="sidebar"
            className={`${isCollapsed && !isMobile ? 'w-100' : 'w-auto'}`}
            style={{
              transition: 'max-width 0.3s',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* ── Menu Items ── */}
        <Menu className="px-1 pb-4" style={{ overflowY: 'auto', flex: 1 }}>

          {/* Home */}
          <MenuItem
            icon={<i className="fa fa-home"></i>}
            component={<Link to="/dashboard" onClick={handleMenuClick} />}
          >
            Home
          </MenuItem>

          {/* SuperAdmin only */}
          {userData?.userGroup === 'SuperAdmin' && (
            <MenuItem
              icon={<i className="fa fa-users"></i>}
              component={<Link to="/dashboard/users" onClick={handleMenuClick} />}
            >
              Users
            </MenuItem>
          )}

          {/* Recipes */}
          <MenuItem
            icon={<i className="fa fa-utensils"></i>}
            component={<Link to="/dashboard/recipes" onClick={handleMenuClick} />}
          >
            Recipes
          </MenuItem>

          {/* SuperAdmin only */}
          {userData?.userGroup === 'SuperAdmin' && (
            <MenuItem
              icon={<i className="fa fa-tags"></i>}
              component={<Link to="/dashboard/categories" onClick={handleMenuClick} />}
            >
              Categories
            </MenuItem>
          )}

          {/* SystemUser only */}
          {userData?.userGroup === 'SystemUser' && (
            <MenuItem
              icon={<i className="fa fa-heart"></i>}
              component={<Link to="/dashboard/favorites" onClick={handleMenuClick} />}
            >
              Favourites
            </MenuItem>
          )}



          {/* Logout */}
          <MenuItem
            icon={<i className="fa fa-sign-out-alt"></i>}
            onClick={logOut}
          >
            Logout
          </MenuItem>

        </Menu>
      </Sidebar>

    </div>
  )
}

export default SideBar