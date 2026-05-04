import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='notfoung-bg vh-100 p-5'>
      <img src={logo} alt='logo' className='w-20' />
      <div className=' justify-content-center align-items-center' style={{color:'#1F263E' ,position:'absolute',top:'50%',left:'6%',transform:'translateY(-50%)'}}>
        <h3 style={{fontSize:'50px'}}>Oops.... </h3>
      <h1 className='text-4xl font-bold pb-0 mb-0' style={{color:'#009247', padding: "0", margin:'0'}}>Page  not found <br/>...</h1>
      <p className='fs-4'>This Page doesn’t exist or was removed!<br/>We suggest you  back to home.</p>
      <button  style={{backgroundColor:'#009247',border:'none' , padding: "0.5rem 2rem" , borderRadius:'0.50rem' , color:'white'}} onClick={() => navigate('/dashboard')}>
        <i class="fa-solid fa-arrow-left" style={{paddingRight:'10px'}}></i> Back to Home
      </button>
      </div>
      
    </div>
  )
}

export default NotFound