import React, { Fragment, useEffect, useState } from 'react'
import { recipesApi } from '../api'
import DeleteConfirmation from '../sharedComponent/DeleteConfirmation'
import AddRecipeModal from './AddRecipeModal'
import { toast } from 'react-toastify'
import noImage from '../assets/no-data.png'
import HeaderCard from '../sharedComponent/HeaderCard'
import headerRecipe from '../assets/header-recipe.png'
const BASE_URL = 'https://upskilling-egypt.com:3006'

const RecipesList = () => {
  const [recipesList, setRecipesList] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeToEdit, setRecipeToEdit] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const getRecipesList = async () => {
    try {
      const response = await recipesApi.getAllRecipes()
      setRecipesList(response.data.data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    }
  }

  const handleDeleteClick = (recipe) => setSelectedRecipe(recipe)
  const handleCloseDeleteModal = () => setSelectedRecipe(null)

  const handleConfirmDelete = async () => {
    try {
      await recipesApi.deleteRecipe(selectedRecipe.id)
      setRecipesList(recipesList.filter(r => r.id !== selectedRecipe.id))
      toast.success('Recipe deleted successfully')
      setSelectedRecipe(null)
    } catch (error) {
      console.error('Error deleting recipe:', error)
      toast.error('Failed to delete recipe')
    }
  }

  const handleRecipeAdded = () => {
    getRecipesList()
    setShowAddModal(false)
    toast.success('Recipe added successfully')
  }

  const handleEditClick = (recipe) => setRecipeToEdit(recipe)

  const handleRecipeUpdated = () => {
    getRecipesList()
    setRecipeToEdit(null)
    toast.success('Recipe updated successfully')
  }

  useEffect(() => { getRecipesList() }, [])

  const avgPrice = recipesList.length
    ? Math.round(recipesList.reduce((sum, r) => sum + (r.price || 0), 0) / recipesList.length)
    : 0

  const uniqueCategories = new Set(
    recipesList.flatMap(r => r.category?.map(c => c.id) || [])
  ).size

  return (
    <Fragment>
      
          <HeaderCard
        title={'Recipes'} subtitle={'Item'}
        describtion1={'You can now add your items that any user can order '}
        describtion2={'it from the Application and you can edit'}
        image={headerRecipe}
      />
      <div className="container-fluid px-5 py-4">
        {/* ── Header ── */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold mb-1 fs-3">Recipes</h2>
            <p className="text-muted mb-0 small">Manage your menu items with ease</p>
          </div>
          <button
            className="btn btn-success d-flex align-items-center gap-2 px-4 py-2 fw-semibold"
            onClick={() => setShowAddModal(true)}
          >
            <i className="fa fa-plus"></i> Add New Recipe
          </button>
        </div>

        {/* ── Stats Cards ── */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 p-3 bg-success bg-opacity-10">
                  <i className="fa fa-utensils text-success fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Total Recipes</p>
                  <h3 className="fw-bold mb-0 text-success">{recipesList.length}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 p-3 bg-primary bg-opacity-10">
                  <i className="fa fa-tag text-primary fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Categories</p>
                  <h3 className="fw-bold mb-0 text-primary">{uniqueCategories}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-3 p-3 bg-warning bg-opacity-10">
                  <i className="fa fa-dollar-sign text-warning fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small mb-0 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Avg. Price</p>
                  <h3 className="fw-bold mb-0 text-warning">${avgPrice}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        {recipesList.length > 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
              <div>
                <h5 className="fw-bold mb-0">Recipes Table</h5>
                <p className="text-muted small mb-0">{recipesList.length} items found</p>
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
                      <th className="text-muted small fw-semibold text-uppercase py-3">Price</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Description</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Tag</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Category</th>
                      <th className="text-muted small fw-semibold text-uppercase py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipesList.map((recipe, i) => (
                      <tr key={recipe.id}>

                        {/* ID */}
                        <td className="ps-4 text-muted small fw-bold">
                          {String(i + 1).padStart(3, '0')}
                        </td>

                        {/* Name */}
                        <td className="fw-semibold">{recipe.name}</td>

                        {/* Image */}
                        <td>
                          {recipe.imagePath
                            ? <img
                                src={`${BASE_URL}/${recipe.imagePath}`}
                                alt={recipe.name}
                                className="rounded-3 object-fit-cover"
                                style={{ width: 45, height: 45 }}
                              />
                            : <div
                                className="rounded-3 bg-light d-flex align-items-center justify-content-center"
                                style={{ width: 45, height: 45 }}
                              >
                                <i className="fa fa-image text-muted"></i>
                              </div>
                          }
                        </td>

                        {/* Price */}
                        <td>
                          <span className="badge text-success fw-semibold fs-6 bg-success bg-opacity-10 px-3 py-2 rounded-pill">
                            ${recipe.price}
                          </span>
                        </td>

                        {/* Description */}
                        <td
                          className="text-muted small"
                          style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          title={recipe.description}
                        >
                          {recipe.description || '—'}
                        </td>

                        {/* Tag */}
                        <td>
                          <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal px-3 py-2 rounded-pill">
                            {recipe.tag?.name || '—'}
                          </span>
                        </td>

                        {/* Category */}
                        <td>
                          {recipe.category?.length > 0
                            ? recipe.category.map(c => (
                                <span key={c.id} className="badge bg-primary bg-opacity-10 text-primary fw-normal px-2 py-1 rounded-pill me-1">
                                  {c.name}
                                </span>
                              ))
                            : <span className="text-muted">—</span>
                          }
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-warning bg-opacity-10 border-0 rounded-3"
                              onClick={() => handleEditClick(recipe)}
                              title="Edit"
                            >
                              <i className="fa fa-edit text-gray"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger bg-opacity-10 border-0 rounded-3"
                              onClick={() => handleDeleteClick(recipe)}
                              title="Delete"
                            >
                              <i className="fa fa-trash "></i>
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
              <div className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 80, height: 80 }}>
                <i className="fa fa-utensils text-success fs-3"></i>
              </div>
              <h5 className="fw-bold mb-1">No Recipes Yet</h5>
              <p className="text-muted small mb-3">Add your first recipe to get started</p>
              <button className="btn btn-success px-4" onClick={() => setShowAddModal(true)}>
                <i className="fa fa-plus me-2"></i> Add New Recipe
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ── Modals ── */}
      <DeleteConfirmation
        show={!!selectedRecipe}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemName={selectedRecipe?.name}
      />
      <AddRecipeModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleRecipeAdded}
      />
      <AddRecipeModal
        show={!!recipeToEdit}
        onClose={() => setRecipeToEdit(null)}
        onSuccess={handleRecipeUpdated}
        recipeToEdit={recipeToEdit}
      />
    </Fragment>
  )
}

export default RecipesList