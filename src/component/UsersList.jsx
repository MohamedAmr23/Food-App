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

  
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

 
  const [filters, setFilters] = useState({
    userName: '',
    email: '',
    country: '',
    groups: ''
  })

  const getUsersList = async (page = pageNumber) => {
    try {
      const params = {
        pageSize,
        pageNumber: page,
        ...(filters.userName && { userName: filters.userName }),
        ...(filters.email && { email: filters.email }),
        ...(filters.country && { country: filters.country }),
        ...(filters.groups && { groups: [parseInt(filters.groups)] }),
      }
      const response = await usersApi.getAllUser(params)
      setUsersList(response.data.data)
      setTotalPages(response.data.totalNumberOfPages)
      setTotalRecords(response.data.totalNumberOfRecords)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to fetch users')
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await usersApi.deleteUser(selectedUser.id)
      toast.success('User deleted successfully')
      setSelectedUser(null)
      setViewUser(null)
      getUsersList(pageNumber)
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = () => {
    setPageNumber(1)
    getUsersList(1)
  }

  const handleResetFilters = () => {
    setFilters({ userName: '', email: '', country: '', groups: '' })
    setPageNumber(1)
    // fetch with empty filters
    setTimeout(() => getUsersList(1), 0)
  }

  const handlePageChange = (newPage) => {
    setPageNumber(newPage)
    getUsersList(newPage)
  }

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => { getUsersList(1) }, [])

  return (
    <Fragment>
      <HeaderCard
        title={'Users'} subtitle={'List'}
        describtion1={'You can now add your items that any user can order '}
        describtion2={'it from the Application and you can edit'}
        image={headerRecipe}
      />  
      <div className="container-fluid px-5 py-4">

       
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold mb-1 fs-3">Users</h2>
            <p className="text-muted mb-0 small">
              Manage all registered users —
              <span className="text-success fw-semibold ms-1">{totalRecords} total</span>
            </p>
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
                  <h3 className="fw-bold mb-0 text-primary">{totalRecords}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-success bg-opacity-10 p-3">
                  <i className="fa fa-user-shield text-success fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Admins</p>
                  <h3 className="fw-bold mb-0 text-success">
                    {usersList.filter(u => u.group?.id === 1).length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-warning bg-opacity-10 p-3">
                  <i className="fa fa-user text-warning fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>System Users</p>
                  <h3 className="fw-bold mb-0 text-warning">
                    {usersList.filter(u => u.group?.id === 2).length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-2 align-items-end">
              <div className="col-md-3">
                <label className="form-label small fw-semibold text-muted text-uppercase" style={{ letterSpacing: '0.05em' }}>Username</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fa fa-user text-muted small"></i>
                  </span>
                  <input
                    type="text"
                    name="userName"
                    value={filters.userName}
                    onChange={handleFilterChange}
                    placeholder="Search by name..."
                    className="form-control border-start-0 ps-0"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-semibold text-muted text-uppercase" style={{ letterSpacing: '0.05em' }}>Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fa fa-envelope text-muted small"></i>
                  </span>
                  <input
                    type="text"
                    name="email"
                    value={filters.email}
                    onChange={handleFilterChange}
                    placeholder="Search by email..."
                    className="form-control border-start-0 ps-0"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold text-muted text-uppercase" style={{ letterSpacing: '0.05em' }}>Country</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fa fa-globe text-muted small"></i>
                  </span>
                  <input
                    type="text"
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                    placeholder="Country..."
                    className="form-control border-start-0 ps-0"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold text-muted text-uppercase" style={{ letterSpacing: '0.05em' }}>Group</label>
                <select
                  name="groups"
                  value={filters.groups}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Groups</option>
                  <option value="1">Admin</option>
                  <option value="2">System User</option>
                </select>
              </div>
              <div className="col-md-2 d-flex gap-2">
                <button
                  className="btn btn-success flex-grow-1 fw-semibold d-flex align-items-center justify-content-center gap-1"
                  onClick={handleSearch}
                >
                  <i className="fa fa-search"></i> Search
                </button>
                <button
                  className="btn btn-light border fw-semibold"
                  onClick={handleResetFilters}
                  title="Reset filters"
                >
                  <i className="fa fa-rotate-left"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        {usersList.length > 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
              <div>
                <h5 className="fw-bold mb-0">Users Table</h5>
                <p className="text-muted small mb-0">
                  Page {pageNumber} of {totalPages} — showing {usersList.length} users
                </p>
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
                      <th className="text-muted small fw-semibold text-uppercase py-3">Country</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Phone</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Group</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, i) => (
                      <tr key={user.id}>

                        {/* # */}
                        <td className="ps-4 text-muted small fw-bold">
                          {((pageNumber - 1) * pageSize) + i + 1}
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

                        {/* Country */}
                        <td className="text-muted small">{user.country || '—'}</td>

                        {/* Phone */}
                        <td className="text-muted small">{user.phoneNumber || '—'}</td>

                        {/* Group */}
                        <td>
                          {user.group?.id === 1
                            ? <span className="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-2 rounded-pill">
                                <i className="fa fa-shield-alt me-1" style={{ fontSize: 10 }}></i> Admin
                              </span>
                            : <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-2 rounded-pill">
                                <i className="fa fa-user me-1" style={{ fontSize: 10 }}></i> System User
                              </span>
                          }
                        </td>

                        {/* Actions */}
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
                            {openMenuId === user.id && (
                              <div
                                className="position-absolute bg-white border rounded-3 shadow-sm py-1"
                                style={{ right: 0, top: '110%', zIndex: 999, minWidth: 140 }}
                                onClick={e => e.stopPropagation()}
                              >
                                <button
                                  className="btn btn-sm w-100 text-start px-3 py-2 d-flex align-items-center gap-2 text-success"
                                  onClick={() => { setViewUser(user); setOpenMenuId(null) }}
                                >
                                  <i className="fa fa-eye text-success"></i> View
                                </button>
                                <button
                                  className="btn btn-sm w-100 text-start px-3 py-2 d-flex align-items-center gap-2 text-danger"
                                  onClick={() => { setSelectedUser(user); setOpenMenuId(null) }}
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

            {/* ── Pagination ── */}
            <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center py-3">
              <p className="text-muted small mb-0">
                Showing <span className="fw-semibold">{((pageNumber - 1) * pageSize) + 1}</span> to{' '}
                <span className="fw-semibold">{Math.min(pageNumber * pageSize, totalRecords)}</span> of{' '}
                <span className="fw-semibold">{totalRecords}</span> users
              </p>
              <nav>
                <ul className="pagination pagination-sm mb-0 gap-1">
                  {/* Prev */}
                  <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link rounded-3 border"
                      onClick={() => handlePageChange(pageNumber - 1)}
                      disabled={pageNumber === 1}
                    >
                      <i className="fa fa-chevron-left small"></i>
                    </button>
                  </li>

                  {/* Page numbers — show max 5 around current */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - pageNumber) <= 1)
                    .reduce((acc, p, idx, arr) => {
                      if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...')
                      acc.push(p)
                      return acc
                    }, [])
                    .map((item, idx) =>
                      item === '...'
                        ? <li key={`dots-${idx}`} className="page-item disabled">
                            <span className="page-link border-0 bg-transparent">...</span>
                          </li>
                        : <li key={item} className={`page-item ${pageNumber === item ? 'active' : ''}`}>
                            <button
                              className="page-link rounded-3 border"
                              onClick={() => handlePageChange(item)}
                            >
                              {item}
                            </button>
                          </li>
                    )
                  }

                  {/* Next */}
                  <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link rounded-3 border"
                      onClick={() => handlePageChange(pageNumber + 1)}
                      disabled={pageNumber === totalPages}
                    >
                      <i className="fa fa-chevron-right small"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

        ) : (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 80, height: 80 }}>
                <i className="fa fa-users text-primary fs-3"></i>
              </div>
              <h5 className="fw-bold mb-1">No Users Found</h5>
              <p className="text-muted small mb-0">Try adjusting your filters</p>
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

      {/* ── View Modal ── */}
      {viewUser && (
        <div
          className="modal show d-block"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setViewUser(null)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content border-0 shadow">
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
              <div className="modal-body px-4 py-3">
                <div className="text-center mb-4">
                  {viewUser.imagePath
                    ? <img src={`${BASE_URL}/${viewUser.imagePath}`} alt={viewUser.userName}
                        className="rounded-circle object-fit-cover border shadow-sm"
                        style={{ width: 90, height: 90 }} />
                    : <div className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center border fw-bold text-primary fs-3"
                        style={{ width: 90, height: 90 }}>
                        {viewUser.userName?.charAt(0).toUpperCase()}
                      </div>
                  }
                  <h5 className="fw-bold mt-3 mb-1">{viewUser.userName}</h5>
                  <span className={`badge rounded-pill px-3 ${viewUser.group?.id === 1 ? 'bg-success bg-opacity-10 text-success' : 'bg-primary bg-opacity-10 text-primary'}`}>
                    {viewUser.group?.name || '—'}
                  </span>
                </div>
                <div className="row g-3">
                  {[
                    { label: 'Email', value: viewUser.email, icon: 'fa-envelope' },
                    { label: 'Phone', value: viewUser.phoneNumber, icon: 'fa-phone' },
                    { label: 'Country', value: viewUser.country, icon: 'fa-globe' },
                    { label: 'Joined', value: viewUser.creationDate ? new Date(viewUser.creationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—', icon: 'fa-calendar' },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="col-6">
                      <div className="bg-light rounded-3 p-3">
                        <p className="text-muted small mb-1 text-uppercase fw-semibold d-flex align-items-center gap-1" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                          <i className={`fa ${icon}`}></i> {label}
                        </p>
                        <p className="fw-semibold mb-0 small text-truncate">{value || '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer border-0 px-4 pb-4 pt-0">
                <button
                  className="btn btn-danger bg-opacity-10 border-0 fw-semibold px-4 d-flex align-items-center gap-2"
                  onClick={() => { setSelectedUser(viewUser); setViewUser(null) }}
                >
                  <i className="fa fa-trash"></i> Delete User
                </button>
                <button className="btn btn-light border fw-semibold px-4" onClick={() => setViewUser(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </Fragment>
  )
}

export default UsersList