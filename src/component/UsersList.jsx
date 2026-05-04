import React, { Fragment, useEffect, useState } from 'react'
import { usersApi } from '../api'
import { toast } from 'react-toastify'
import DeleteConfirmation from '../sharedComponent/DeleteConfirmation'
import noImage from '../assets/no-data.png'
import HeaderCard from '../sharedComponent/HeaderCard'
import headerRecipe from '../assets/header-recipe.png'
const BASE_URL = 'https://upskilling-egypt.com:3006'
const UsersList = () => {
   const [usersList, setUsersList] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [viewUser, setViewUser] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)

  const getUsersList = async () => {
    try {
      const response = await usersApi.getAllUser()
      setUsersList(response.data.data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to fetch users')
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await usersApi.deleteUser(selectedUser.id)
      setUsersList(usersList.filter(u => u.id !== selectedUser.id))
      toast.success('User deleted successfully')
      setSelectedUser(null)
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => { getUsersList() }, [])

  const activeUsers = usersList.filter(u => u.activated).length
  const inactiveUsers = usersList.filter(u => !u.activated).length

  return (
    <>
      <HeaderCard
        title={'Users'} subtitle={'List'}
        describtion1={'You can now add your items that any user can order '}
        describtion2={'it from the Application and you can edit'}
        image={headerRecipe}
      />  
      <div className="container-fluid px-5 py-4">

        {/* ── Header ── */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold mb-1 fs-3">Users</h2>
            <p className="text-muted mb-0 small">Manage all registered users</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-primary bg-opacity-10 p-3">
                  <i className="fa fa-users text-primary fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Total Users</p>
                  <h3 className="fw-bold mb-0 text-primary">{usersList.length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-success bg-opacity-10 p-3">
                  <i className="fa fa-user-check text-success fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Active</p>
                  <h3 className="fw-bold mb-0 text-success">{activeUsers}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-danger bg-opacity-10 p-3">
                  <i className="fa fa-user-times text-danger fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Inactive</p>
                  <h3 className="fw-bold mb-0 text-danger">{inactiveUsers}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        {usersList.length > 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
              <div>
                <h5 className="fw-bold mb-0">Users Table Details</h5>
                <p className="text-muted small mb-0">You can check all details</p>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 text-muted small fw-semibold text-uppercase py-3">#</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Name</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Image</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Email</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Phone</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Status</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, i) => (
                      <tr key={user.id}>

                        {/* # */}
                        <td className="ps-4 text-muted small fw-bold">
                          {String(i + 1).padStart(3, '0')}
                        </td>

                        {/* Name */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0 fw-bold text-primary small"
                              style={{ width: 36, height: 36 }}
                            >
                              {user.userName?.charAt(0).toUpperCase()}
                            </div>
                            <span className="fw-semibold">{user.userName}</span>
                          </div>
                        </td>

                        {/* Image */}
                        <td>
                          {user.imagePath
                            ? <img
                                src={`${BASE_URL}/${user.imagePath}`}
                                alt={user.userName}
                                className="rounded-3 object-fit-cover"
                                style={{ width: 45, height: 45 }}
                              />
                            : <div
                                className="rounded-3 bg-light border d-flex align-items-center justify-content-center"
                                style={{ width: 45, height: 45 }}
                              >
                                <i className="fa fa-user text-muted"></i>
                              </div>
                          }
                        </td>

                        {/* Email */}
                        <td className="text-muted small">{user.email}</td>

                        {/* Phone */}
                        <td className="text-muted small">{user.phoneNumber || '—'}</td>

                        {/* Status */}
                        <td>
                          {user.activated
                            ? <span className="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-2 rounded-pill">
                                <i className="fa fa-circle me-1" style={{ fontSize: 7 }}></i> Active
                              </span>
                            : <span className="badge bg-danger bg-opacity-10 text-danger fw-semibold px-3 py-2 rounded-pill">
                                <i className="fa fa-circle me-1" style={{ fontSize: 7 }}></i> Inactive
                              </span>
                          }
                        </td>

                        {/* Actions — "..." dropdown */}
                        <td>
                          <div className="position-relative">
                            <button
                              className="btn btn-sm btn-light border rounded-3 px-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                setOpenMenuId(openMenuId === user.id ? null : user.id)
                              }}
                            >
                              <i className="fa fa-ellipsis-h text-muted"></i>
                            </button>

                            {/* Dropdown */}
                            {openMenuId === user.id && (
                              <div
                                className="position-absolute bg-white border rounded-3 shadow-sm py-1"
                                style={{ right: 0, top: '110%', zIndex: 999, minWidth: 140 }}
                                onClick={e => e.stopPropagation()}
                              >
                                <button
                                  className="btn btn-sm w-100 text-start px-3 py-2 d-flex align-items-center gap-2 text-success"
                                  onClick={() => {
                                    setViewUser(user)
                                    setOpenMenuId(null)
                                  }}
                                >
                                  <i className="fa fa-eye text-success"></i> View
                                </button>
                                <button
                                  className="btn btn-sm w-100 text-start px-3 py-2 d-flex align-items-center gap-2 text-danger"
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setOpenMenuId(null)
                                  }}
                                >
                                  <i className="fa fa-trash text-danger"></i> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        ) : (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div
                className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: 80, height: 80 }}
              >
                <i className="fa fa-users text-primary fs-3"></i>
              </div>
              <h5 className="fw-bold mb-1">No Users Found</h5>
              <p className="text-muted small mb-0">Registered users will appear here</p>
            </div>
          </div>
        )}

      </div>

      {/* ── Delete Modal ── */}
      <DeleteConfirmation
        show={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleConfirmDelete}
        itemName={selectedUser?.userName}
      />

      {/* ── View User Modal ── */}
      {viewUser && (
        <div
          className="modal show d-block"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setViewUser(null)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content border-0 shadow">

              {/* Header */}
              <div className="modal-header border-0 pb-0 px-4 pt-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 bg-primary bg-opacity-10 p-2">
                    <i className="fa fa-user text-primary fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">User Details</h5>
                    <p className="text-muted small mb-0">Full profile information</p>
                  </div>
                </div>
                <button className="btn-close" onClick={() => setViewUser(null)}></button>
              </div>

              {/* Body */}
              <div className="modal-body px-4 py-3">

                {/* Avatar */}
                <div className="text-center mb-4">
                  {viewUser.imagePath
                    ? <img
                        src={`${BASE_URL}/${viewUser.imagePath}`}
                        alt={viewUser.userName}
                        className="rounded-circle object-fit-cover border shadow-sm"
                        style={{ width: 90, height: 90 }}
                      />
                    : <div
                        className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center border fw-bold text-primary fs-3"
                        style={{ width: 90, height: 90 }}
                      >
                        {viewUser.userName?.charAt(0).toUpperCase()}
                      </div>
                  }
                  <h5 className="fw-bold mt-3 mb-1">{viewUser.userName}</h5>
                  {viewUser.activated
                    ? <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Active</span>
                    : <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3">Inactive</span>
                  }
                </div>

                {/* Info rows */}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3">
                      <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Email</p>
                      <p className="fw-semibold mb-0 small text-truncate">{viewUser.email || '—'}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3">
                      <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Phone</p>
                      <p className="fw-semibold mb-0 small">{viewUser.phoneNumber || '—'}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3">
                      <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Country</p>
                      <p className="fw-semibold mb-0 small">{viewUser.country || '—'}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3">
                      <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>Joined</p>
                      <p className="fw-semibold mb-0 small">
                        {viewUser.creationDate
                          ? new Date(viewUser.creationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : '—'
                        }
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="modal-footer border-0 px-4 pb-4 pt-0">
                <button
                  className="btn btn-danger bg-opacity-10 text-danger border-0 fw-semibold px-4 d-flex align-items-center gap-2"
                  onClick={() => {
                    setSelectedUser(viewUser)
                    setViewUser(null)
                  }}
                >
                  <i className="fa fa-trash"></i> Delete User
                </button>
                <button
                  className="btn btn-light border fw-semibold px-4"
                  onClick={() => setViewUser(null)}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </>
     
  )
}

export default UsersList