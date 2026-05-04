import axios from 'axios'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { authApi } from '../api'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  let {register , formState:{errors} , handleSubmit} =useForm()
  const navigate = useNavigate()
  const {userToken , setUserToken} = useContext(UserContext)
  const onSubmit = async (data) => {
    try{
      const response =await authApi.Login(data)
      toast.success('Login successful!')
      localStorage.setItem('token', response.data.token)
      setUserToken(response.data.token)
      navigate('/dashboard')
      
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message || 'Login failed. Please try again.')
    }
  }
  return (
    <div>
      <div className='title'>
        <h5>Log In</h5>
        <span style={{ color: '#8391A1' }} >Welcome Back! Please enter your details</span>
      </div>
       <form className='mt-3' onSubmit={handleSubmit(onSubmit)} >
          {/* Email */}
          <div className="input-group mb-3 position-relative" style={{ color: '#8391A1' }}>
            <span className="input-group-text bg-light border-end-0 line-right">
              <i className="bi bi-phone" style={{ color: '#8391A1' }}></i>
            </span>
            <input
              type="email"
              {...register('email' , {required:'Email is required' , pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , message:'Invalid email address'}}) }
              className="form-control bg-light border-start-0 ps-0 focus-none"
              style={{paddingTop:"10px" , paddingBottom:"10px" , border:'none'}}
              placeholder="Enter your E-mail"
              aria-describedby='email'
            />
          </div>
            {errors.email && <p className='text-danger mb-2' style={{ fontSize: '13px' }}>{errors.email.message}</p>}
          {/* Password */}
          <div className="input-group mb-2">
            <span className="input-group-text bg-light border-end-0 line-right">
              <i className="bi bi-lock" style={{ color: '#8391A1' }}></i>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password' , {required:'Password is required' , minLength:{value:6 , message:'Password must be at least 6 characters'}}) }
              className="form-control bg-light border-start-0 ps-0 focus-none"
              style={{paddingTop:"10px" , paddingBottom:"10px" , border:'none'}}
              placeholder="Password"
              aria-describedby='password'
            />
             <span
                className="input-group-text bg-light border-start-0"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`} style={{ color: '#8391A1' }}></i>
              </span>
          </div>
          {errors.password && <p className='text-danger mb-2' style={{ fontSize: '13px' }}>{errors.password.message}</p>}
          {/* Links */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/register" className="text-dark fw-semibold text-decoration-none" style={{ fontSize: '13px' }}>
              Register Now?
            </Link>
            <Link to="/forget-password" className="text-decoration-none fw-semibold" style={{ fontSize: '13px', color: '#3a9e5f' }}>
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{ backgroundColor: '#3a9e5f', borderRadius: '8px', padding: '10px',marginBottom:'30px' }}
          >
            Login
          </button>
        </form>
    </div>
  )
}

export default Login