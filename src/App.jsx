import React from 'react'
import Route from './Routes/Route'
import { ToastContainer } from 'react-toastify'
import UserContextProvider from './context/UserContext'

const App = () => {
  return (
    <>
    <UserContextProvider>
    <Route/>
    <ToastContainer/>
    </UserContextProvider>
    </>
  )
}

export default App