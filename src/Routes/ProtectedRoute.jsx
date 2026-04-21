import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
  const {userToken} = useContext(UserContext)
  if(localStorage.getItem('token') || userToken){
    return children
  }else{
    return <Navigate to='/login' replace={true}/>
  }
}

export default ProtectedRoute