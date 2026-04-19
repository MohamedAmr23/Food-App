import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
   let {register , formState:{errors} , handleSubmit} =useForm()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try{
      const response =await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data)
      toast.success('Password reset link sent!')
      navigate('/reset-password')
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message || 'Password reset failed. Please try again.')
    }
  }
  return (
    <div>
      <div className='title' >
        <h5>Forgot Your Password?</h5>
        <span style={{ color: '#8391A1' }} >No worries! Please enter your email and we will send a password reset link </span>
      </div>
        <form className='mt-3' onSubmit={handleSubmit(onSubmit)} >
          {/* Email */}
          <div className="input-group mb-3 position-relative mb-5" style={{ color: '#8391A1' }}>
            <span className="input-group-text bg-light border-end-0 line-right">
              <i className="bi bi-phone" style={{ color: '#8391A1' }}></i>
            </span>
            <input
              type="email"
              {...register('email' , {required:'Email is required' , pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , message:'Invalid email address'}}) }
              className="form-control bg-light border-start-0 ps-0 focus-none"
              placeholder="Enter your E-mail"
              aria-describedby='email'
            />
          </div>
            {errors.email && <p className='text-danger mb-2' style={{ fontSize: '13px' }}>{errors.email.message}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{ backgroundColor: '#3a9e5f', borderRadius: '8px', padding: '10px' }}
          >
            Submit
          </button>
        </form>
    </div>
  )
}

export default ForgetPassword