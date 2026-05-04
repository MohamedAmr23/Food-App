import React, { Fragment, useEffect, useState } from 'react'
import { categoriesApi } from '../api'
import DeleteConfirmation from '../sharedComponent/DeleteConfirmation'
import AddCategoryModal from './AddCategoryModal'
import { toast } from 'react-toastify'
import headerRecipe from '../assets/header-recipe.png'
import HeaderCard from '../sharedComponent/HeaderCard'
const CategoriesList = () => {
  const [categoriesList, setCategoriesList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState(null)

  const getCategoriesList = async () => {
    try {
      const response = await categoriesApi.getAllCategories()
      setCategoriesList(response.data.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleDeleteClick = (category) => setSelectedCategory(category)
  const handleCloseModal = () => setSelectedCategory(null)

  const handleConfirmDelete = async () => {
    try {
      await categoriesApi.deleteCategory(selectedCategory.id)
      setCategoriesList(categoriesList.filter(c => c.id !== selectedCategory.id))
      toast.success('Category deleted successfully')
      setSelectedCategory(null)
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  const handleCategoryAdded = () => {
    getCategoriesList()
    setShowAddModal(false)
    toast.success('Category added successfully')
  }

  const handleEditClick = (category) => setCategoryToEdit(category)

  const handleCategoryUpdated = () => {
    getCategoriesList()
    setCategoryToEdit(null)
    toast.success('Category updated successfully')
  }

  useEffect(() => { getCategoriesList() }, [])

  return (
    <Fragment>
      
         <HeaderCard
        title={'Categories'} subtitle={'Item'}
        describtion1={'You can now add your items that any user can order '}
        describtion2={'it from the Application and you can edit'}
        image={headerRecipe}
      />
      <div  className="container-fluid px-5 py-4">
        {/* ── Header ── */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold mb-1 fs-3">Categories</h2>
            <p className="text-muted mb-0 small">Manage your menu categories</p>
          </div>
          <button
            className="btn btn-success d-flex align-items-center gap-2 px-4 py-2 fw-semibold"
            onClick={() => setShowAddModal(true)}
          >
            <i className="fa fa-plus"></i> Add New Category
          </button>
        </div>

        {/* ── Stat Card ── */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-success bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
                  <i className="fa fa-list text-success fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>
                    Total Categories
                  </p>
                  <h3 className="fw-bold mb-0 text-success">{categoriesList.length}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-primary bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
                  <i className="fa fa-calendar text-primary fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>
                    Latest Added
                  </p>
                  <h6 className="fw-bold mb-0 text-primary">
                    {categoriesList.length > 0
                      ? categoriesList[0]?.name
                      : '—'
                    }
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 bg-warning bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
                  <i className="fa fa-clock text-warning fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>
                    Last Updated
                  </p>
                  <h6 className="fw-bold mb-0 text-warning">
                    {categoriesList.length > 0
                      ? new Date(categoriesList[categoriesList.length - 1]?.creationDate).toLocaleDateString()
                      : '—'
                    }
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        {categoriesList.length > 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
              <div>
                <h5 className="fw-bold mb-0">Categories Table</h5>
                <p className="text-muted small mb-0">{categoriesList.length} categories found</p>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 text-muted small fw-semibold text-uppercase py-3">#</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Name</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Creation Date</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesList.map((category, i) => (
                      <tr
                        key={category.id}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8fff8'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        {/* # */}
                        <td className="ps-4 text-muted small fw-bold">
                          {String(i + 1).padStart(3, '0')}
                        </td>

                        {/* Name */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ width: 36, height: 36 }}>
                              <span className="text-success fw-bold small">
                                {category.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="fw-semibold">{category.name}</span>
                          </div>
                        </td>

                        {/* Creation Date */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <i className="fa fa-calendar-alt text-muted small"></i>
                            <span className="text-muted small">
                              {category.creationDate
                                ? new Date(category.creationDate).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'short', day: 'numeric'
                                  })
                                : '—'
                              }
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-warning bg-opacity-10 border-0 rounded-3 d-flex align-items-center gap-1 px-3"
                              onClick={() => handleEditClick(category)}
                              title="Edit"
                            >
                              <i className="fa fa-edit "></i>
                              <span className="small fw-semibold">Edit</span>
                            </button>
                            <button
                              className="btn btn-sm btn-danger bg-opacity-10 border-0 rounded-3 d-flex align-items-center gap-1 px-3"
                              onClick={() => handleDeleteClick(category)}
                              title="Delete"
                            >
                              <i className="fa fa-trash "></i>
                              <span className=" small fw-semibold">Delete</span>
                            </button>
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
          /* ── Empty State ── */
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div
                className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: 80, height: 80 }}
              >
                <i className="fa fa-list text-success fs-3"></i>
              </div>
              <h5 className="fw-bold mb-1">No Categories Yet</h5>
              <p className="text-muted small mb-3">Add your first category to get started</p>
              <button
                className="btn btn-success px-4 fw-semibold"
                onClick={() => setShowAddModal(true)}
              >
                <i className="fa fa-plus me-2"></i> Add New Category
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ── Modals ── */}
      <DeleteConfirmation
        show={!!selectedCategory}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        itemName={selectedCategory?.name}
      />
      <AddCategoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleCategoryAdded}
      />
      <AddCategoryModal
        show={!!categoryToEdit}
        onClose={() => setCategoryToEdit(null)}
        onSuccess={handleCategoryUpdated}
        categoryToEdit={categoryToEdit}
      />
    </Fragment>
  )
}

export default CategoriesList