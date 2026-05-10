import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useLocation } from 'react-router-dom'

const AdminOrUser = ({ children }) => {
  const { pathname } = useLocation()
  const { userData } = useContext(UserContext)

  const isUser = userData?.userGroup === 'SystemUser'
  const isSuperAdmin = userData?.userGroup === 'SuperAdmin'

  const AdminRoutes = ['users', 'categories']
  const UserRoutes = ['favorites']

  
  const currentRoute = pathname.split('/').pop()
  if (isSuperAdmin) {
    return AdminRoutes.includes(currentRoute) ? children : <Navigate to='/no-data' />
  }

  if (isUser) {
    return UserRoutes.includes(currentRoute) ? children : <Navigate to='/no-data' />
  }

  
  return <Navigate to='/no-data' />
}

export default AdminOrUser