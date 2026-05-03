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
  }, [categoryToEdit, setValue, reset])

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        // UPDATE
        await categoriesApi.updateCategory(categoryToEdit.id, { name: data.categoryName })
      } else {
        // CREATE
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
      <Modal.Header closeButton>

        <Modal.Title>{isEditMode ? 'Edit Category' : 'Add Category'}</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Category Name"
              className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
              {...register('categoryName', {
                required: 'Category name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />
            {errors.categoryName && (
              <div className="invalid-feedback">
                {errors.categoryName.message}
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="submit"
            variant="success"
            className="w-100"
            disabled={isSubmitting}
          >
          
            {isSubmitting
              ? (isEditMode ? 'Updating...' : 'Saving...')
              : (isEditMode ? 'Update' : 'Save')
            }
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddCategoryModal