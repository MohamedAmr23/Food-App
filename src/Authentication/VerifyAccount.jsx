import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const VerifyAccount = () => {
  const { register, formState: { errors }, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/verify', {
        email: data.email,
        code: data.code
      })
      toast.success('Account verified successfully!')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed. Please try again.')
    }
  }

  return (
    <div>
      <div className="title mb-4">
        <h5 className="fw-semibold">Verify Account</h5>
        <span style={{ color: '#8391A1', fontSize: '14px' }}>
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Email */}
        <div className="input-group mb-4">
          <span className="input-group-text bg-light border-end-0 line-right">
            <i className="bi bi-envelope" style={{ color: '#8391A1' }}></i>
          </span>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Invalid email address' }
            })}
            className="form-control bg-light border-start-0 ps-0 focus-none"
            style={{paddingTop:"10px" , paddingBottom:"10px" , border:'none'}}
            placeholder="Email"
          />
        </div>
        {errors.email && <p className="text-danger mb-2" style={{ fontSize: '13px' }}>{errors.email.message}</p>}

        {/* OTP */}
        <div className="input-group mb-2">
          <span className="input-group-text bg-light border-end-0 line-right">
            <i className="bi bi-lock" style={{ color: '#8391A1' }}></i>
          </span>
          <input
            type="text"
            {...register('code', {
              required: 'OTP code is required',
              minLength: { value: 4, message: 'OTP must be at least 4 characters' }
            })}
            className="form-control bg-light border-start-0 ps-0 focus-none"
            style={{paddingTop:"10px" , paddingBottom:"10px" , border:'none'}}
            placeholder="OTP"
          />
        </div>
        {errors.code && <p className="text-danger mb-2" style={{ fontSize: '13px' }}>{errors.code.message}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="btn w-100 text-white fw-semibold mt-3 mb-5"
          style={{ backgroundColor: '#3a9e5f', borderRadius: '8px', padding: '10px' }}
        >
          Send
        </button>

      </form>
    </div>
  )
}

export default VerifyAccount