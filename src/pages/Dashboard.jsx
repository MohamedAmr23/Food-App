import React, { useContext } from 'react'
import HeaderCard from '../sharedComponent/HeaderCard'
import { UserContext } from '../context/UserContext'
import headerImg from '../assets/header-image.png'
const Dashboard = () => {
  const {userData} = useContext(UserContext)
  return (
    <>
     <HeaderCard 
      title="Welcome" 
      subtitle={userData?.userName} 
      describtion1="This is a welcoming screen for the entry of the application ," 
      describtion2="you can now see the options" 
      image={headerImg} 
    />
    </>
  )
}

export default Dashboard