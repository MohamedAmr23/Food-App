import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import logo from '../assets/logo.png'
import { authApi } from '../api'

const ChangePassword = ({ asModal = false, onClose }) => {
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const newPassword = watch('newPassword')

  const onSubmit = async (data) => {
    try {
      await authApi.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword
      })
      toast.success('Password changed successfully')
      reset()
      if (onClose) onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password')
    }
  }

  const formContent = (
    <div className="bg-white rounded-4 shadow px-5 py-4">

      
      <div className="text-center mb-3">
        <img src={logo} alt="logo" className="w-50" />
      </div>

   
      <div className="mb-4 title">
        <h5 className="fw-bold mb-1" style={{color:'#494949'}}>Change Your Password</h5>
        <p className="mb-0" style={{ color: '#8391A1' }}>Enter your details below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

       
        <div className="input-group mb-2">
          <span className="input-group-text bg-light border-end-0  line-right">
            <i className="bi bi-lock" style={{ color: '#8391A1' }}></i>
          </span>
          <input
            type={showOld ? 'text' : 'password'}
            placeholder="Old Password"
            className="form-control bg-light border-start-0 border-end-0 ps-0 focus-none"
            style={{ paddingTop: '10px', paddingBottom: '10px', border: 'none' }}
            {...register('oldPassword', { required: 'Old password is required' })}
          />
          <span
            className="input-group-text bg-light border-start-0"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowOld(!showOld)}
          >
            <i className={`bi ${showOld ? 'bi-eye' : 'bi-eye-slash'}`} style={{ color: '#8391A1' }}></i>
          </span>
        </div>
        {errors.oldPassword && (
          <p className="text-danger mb-2" style={{ fontSize: '13px' }}>
            {errors.oldPassword.message}
          </p>
        )}

        {/* ── New Password ── */}
        <div className="input-group mb-2">
          <span className="input-group-text bg-light border-end-0">
            <i className="bi bi-lock" style={{ color: '#8391A1' }}></i>
          </span>
          <input
            type={showNew ? 'text' : 'password'}
            placeholder="New Password"
            className="form-control bg-light border-start-0 border-end-0 ps-0 focus-none"
            style={{ paddingTop: '10px', paddingBottom: '10px', border: 'none' }}
            {...register('newPassword', {
              required: 'New password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          <span
            className="input-group-text bg-light border-start-0"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowNew(!showNew)}
          >
            <i className={`bi ${showNew ? 'bi-eye' : 'bi-eye-slash'}`} style={{ color: '#8391A1' }}></i>
          </span>
        </div>
        {errors.newPassword && (
          <p className="text-danger mb-2" style={{ fontSize: '13px' }}>
            {errors.newPassword.message}
          </p>
        )}

        {/* ── Confirm New Password ── */}
        <div className="input-group mb-2">
          <span className="input-group-text bg-light border-end-0">
            <i className="bi bi-lock" style={{ color: '#8391A1' }}></i>
          </span>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm New Password"
            className="form-control bg-light border-start-0 border-end-0 ps-0 focus-none"
            style={{ paddingTop: '10px', paddingBottom: '10px', border: 'none' }}
            {...register('confirmNewPassword', {
              required: 'Please confirm your new password',
              validate: value => value === newPassword || 'Passwords do not match'
            })}
          />
          <span
            className="input-group-text bg-light border-start-0"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowConfirm(!showConfirm)}
          >
            <i className={`bi ${showConfirm ? 'bi-eye' : 'bi-eye-slash'}`} style={{ color: '#8391A1' }}></i>
          </span>
        </div>
        {errors.confirmNewPassword && (
          <p className="text-danger mb-2" style={{ fontSize: '13px' }}>
            {errors.confirmNewPassword.message}
          </p>
        )}

        {/* ── Submit ── */}
        <button
          type="submit"
          className="btn btn-success w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm"></span>
              Changing...
            </>
          ) : (
            <>
              <i className="fa fa-key"></i>
              Change Password
            </>
          )}
        </button>

      </form>
    </div>
  )

  //  Render as modal overlay
  if (asModal) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        onClick={onClose}
      >
        <div className="col-lg-4 col-md-6 col-sm-10" onClick={e => e.stopPropagation()}>
          {/* close X button */}
          <div className="position-relative">
            <button
              className="btn btn-light position-absolute rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{ top: -15, right: -15, zIndex: 10, width: 36, height: 36 }}
              onClick={onClose}
            >
              <i className="fa fa-times text-muted"></i>
            </button>
            {formContent}
          </div>
        </div>
      </div>
    )
  }

  // ── Render as standalone page ────────────────────
  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-5 col-md-7 col-sm-10">
            {formContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword