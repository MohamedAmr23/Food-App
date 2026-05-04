import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'
import { recipesApi, categoriesApi } from '../api'
import { toast } from 'react-toastify'

const AddRecipeModal = ({ show, onClose, onSuccess, recipeToEdit = null }) => {
  const isEditMode = !!recipeToEdit
  const [categoriesList, setCategoriesList] = useState([])
  const [imagePreview, setImagePreview] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const fetchDropdowns = async () => {
    try {
      const categoriesRes = await categoriesApi.getAllCategories()
      setCategoriesList(categoriesRes.data.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => { fetchDropdowns() }, [])

  useEffect(() => {
    if (recipeToEdit) {
      setValue('name', recipeToEdit.name)
      setValue('price', recipeToEdit.price)
      setValue('description', recipeToEdit.description)
      setValue('tagId', recipeToEdit.tag?.id || '')
      if (recipeToEdit.category?.length > 0) {
        setValue('categoriesIds', recipeToEdit.category[0].id)
      }
      setImagePreview(
        recipeToEdit.imagePath
          ? `https://upskilling-egypt.com:3006/${recipeToEdit.imagePath}`
          : null
      )
    } else {
      reset()
      setImagePreview(null)
    }
  }, [recipeToEdit])

  const watchedImage = watch('recipeImage')
  useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      setImagePreview(URL.createObjectURL(watchedImage[0]))
    }
  }, [watchedImage])

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        const hasNewImage = data.recipeImage && data.recipeImage[0]
        const nothingChanged =
          !hasNewImage &&
          data.name === recipeToEdit.name &&
          parseInt(data.price) === recipeToEdit.price &&
          data.description === recipeToEdit.description &&
          parseInt(data.tagId) === recipeToEdit.tag?.id &&
          parseInt(data.categoriesIds) === recipeToEdit.category?.[0]?.id

        if (nothingChanged) {
          toast.info('Nothing changed to be updated')
          return
        }
      }

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', parseInt(data.price))
      formData.append('tagId', parseInt(data.tagId))
      formData.append('categoriesIds', data.categoriesIds)

      if (data.recipeImage && data.recipeImage[0]) {
        formData.append('recipeImage', data.recipeImage[0])
      } else if (isEditMode && recipeToEdit.imagePath) {
        const response = await fetch(`https://upskilling-egypt.com:3006/${recipeToEdit.imagePath}`)
        const blob = await response.blob()
        const filename = recipeToEdit.imagePath.split('/').pop()
        formData.append('recipeImage', blob, filename)
      }

      if (isEditMode) {
        await recipesApi.updateRecipe(recipeToEdit.id, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await recipesApi.addRecipe(formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }

      reset()
      setImagePreview(null)
      onSuccess()
    } catch (error) {
      console.error('API error details:', error.response?.data)
    }
  }

  const handleClose = () => {
    reset()
    setImagePreview(null)
    onClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">

      {/* ── Header ── */}
      <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-3 bg-success bg-opacity-10 p-2 d-flex align-items-center justify-content-center">
            <i className={`fa ${isEditMode ? 'fa-edit' : 'fa-plus'} text-success fs-5`}></i>
          </div>
          <div>
            <Modal.Title className="fw-bold fs-5 mb-0">
              {isEditMode ? 'Edit Recipe' : 'Add New Recipe'}
            </Modal.Title>
            <p className="text-muted small mb-0">
              {isEditMode ? 'Update the recipe details below' : 'Fill in the details to add a new recipe'}
            </p>
          </div>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="px-4 py-3">
          <div className="row g-3">

            {/* ── Name ── */}
            <div className="col-md-6">
              <label className="form-label fw-semibold small text-uppercase text-muted" style={{ letterSpacing: '0.05em' }}>
                Recipe Name <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa fa-utensils text-muted small"></i>
                </span>
                <input
                  type="text"
                  placeholder="e.g. Grilled Salmon"
                  className={`form-control border-start-0 ps-0 ${errors.name ? 'is-invalid' : ''}`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>
            </div>

            {/* ── Price ── */}
            <div className="col-md-6">
              <label className="form-label fw-semibold small text-uppercase text-muted" style={{ letterSpacing: '0.05em' }}>
                Price <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa fa-dollar-sign text-muted small"></i>
                </span>
                <input
                  type="number"
                  placeholder="0"
                  className={`form-control border-start-0 ps-0 ${errors.price ? 'is-invalid' : ''}`}
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                />
                {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
              </div>
            </div>

            {/* ── Tag ── */}
            <div className="col-md-6">
              <label className="form-label fw-semibold small text-uppercase text-muted" style={{ letterSpacing: '0.05em' }}>
                Tag ID <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa fa-tag text-muted small"></i>
                </span>
                <input
                  type="number"
                  placeholder="Tag ID"
                  className={`form-control border-start-0 ps-0 ${errors.tagId ? 'is-invalid' : ''}`}
                  {...register('tagId', { required: 'Tag is required' })}
                />
                {errors.tagId && <div className="invalid-feedback">{errors.tagId.message}</div>}
              </div>
            </div>

            {/* ── Category ── */}
            <div className="col-md-6">
              <label className="form-label fw-semibold small text-uppercase text-muted" style={{ letterSpacing: '0.05em' }}>
                Category <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa fa-list text-muted small"></i>
                </span>
                <select
                  className={`form-select border-start-0 ${errors.categoriesIds ? 'is-invalid' : ''}`}
                  {...register('categoriesIds', { required: 'Category is required' })}
                >
                  <option value="">-- Select Category --</option>
                  {categoriesList.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoriesIds && <div className="invalid-feedback">{errors.categoriesIds.message}</div>}
              </div>
            </div>

            {/* ── Description ── */}
            <div className="col-12">
              <label className="form-label fw-semibold small text-uppercase text-muted" style={{ letterSpacing: '0.05em' }}>
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe the recipe ingredients, taste, or preparation..."
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>

            {/* ── Image ── */}
            <div className="col-12">
              <label className="form-label fw-semibold small text-uppercase text-muted" style={{ letterSpacing: '0.05em' }}>
                Recipe Image {!isEditMode && <span className="text-danger">*</span>}
                {isEditMode && <span className="text-muted fw-normal normal-case ms-1">(leave empty to keep current)</span>}
              </label>

              {/* Preview + Upload side by side */}
              <div className="d-flex align-items-center gap-3">
                {/* Image preview box */}
                <div
                  className="rounded-3 bg-light border d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0"
                  style={{ width: 80, height: 80 }}
                >
                  {imagePreview
                    ? <img src={imagePreview} alt="Preview" className="w-100 h-100 object-fit-cover" />
                    : <i className="fa fa-image text-muted fs-4"></i>
                  }
                </div>

                {/* File input */}
                <div className="flex-grow-1">
                  <input
                    type="file"
                    accept="image/*"
                    className={`form-control ${errors.recipeImage ? 'is-invalid' : ''}`}
                    {...register('recipeImage', {
                      required: !isEditMode ? 'Image is required' : false
                    })}
                  />
                  {errors.recipeImage && (
                    <div className="invalid-feedback">{errors.recipeImage.message}</div>
                  )}
                  <p className="text-muted small mt-1 mb-0">
                    <i className="fa fa-info-circle me-1"></i>
                    PNG, JPG or JPEG — max 5MB
                  </p>
                </div>
              </div>
            </div>

          </div>
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
                {isEditMode ? 'Update Recipe' : 'Save Recipe'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddRecipeModal