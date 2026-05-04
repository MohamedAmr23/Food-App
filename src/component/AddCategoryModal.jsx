import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'
import { categoriesApi } from '../api'

const AddCategoryModal = ({ show, onClose, onSuccess, categoryToEdit = null }) => {
  const isEditMode = !!categoryToEdit

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm()

  useEffect(() => {
    if (categoryToEdit) {
      setValue('categoryName', categoryToEdit.name)
    } else {
      reset()
    }
  }, [categoryToEdit])

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await categoriesApi.updateCategory(categoryToEdit.id, { name: data.categoryName })
      } else {
        await categoriesApi.addCategory({ name: data.categoryName })
      }
      reset()
      onSuccess()
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} category:`, error)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>

      {/* ── Header ── */}
      <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-3 bg-success bg-opacity-10 p-2 d-flex align-items-center justify-content-center">
            <i className={`fa ${isEditMode ? 'fa-edit' : 'fa-plus'} text-success fs-5`}></i>
          </div>
          <div>
            <Modal.Title className="fw-bold fs-5 mb-0">
              {isEditMode ? 'Edit Category' : 'Add New Category'}
            </Modal.Title>
            <p className="text-muted small mb-0">
              {isEditMode ? 'Update the category name below' : 'Enter a name for your new category'}
            </p>
          </div>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="px-4 py-3">

          <label
            className="form-label fw-semibold small text-uppercase text-muted"
            style={{ letterSpacing: '0.05em' }}
          >
            Category Name <span className="text-danger">*</span>
          </label>

          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="fa fa-list text-muted small"></i>
            </span>
            <input
              type="text"
              placeholder="e.g. Italian, Seafood, Desserts..."
              className={`form-control border-start-0 ps-0 ${errors.categoryName ? 'is-invalid' : ''}`}
              {...register('categoryName', {
                required: 'Category name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />
            {errors.categoryName && (
              <div className="invalid-feedback">{errors.categoryName.message}</div>
            )}
          </div>

          <p className="text-muted small mt-2 mb-0">
            <i className="fa fa-info-circle me-1"></i>
            Category name must be at least 2 characters
          </p>

        </Modal.Body>

        {/* ── Footer ── */}
        <Modal.Footer className="border-0 px-4 pb-4 pt-0 d-flex gap-2">
          <Button
            variant="light"
            onClick={handleClose}
            className="fw-semibold px-4 border"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting}
            className="fw-semibold px-4 d-flex align-items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm"></span>
                {isEditMode ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              <>
                <i className={`fa ${isEditMode ? 'fa-save' : 'fa-plus'}`}></i>
                {isEditMode ? 'Update Category' : 'Save Category'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddCategoryModal