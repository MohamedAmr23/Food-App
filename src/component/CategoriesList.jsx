import React, { Fragment, useEffect, useState } from 'react'
import HeaderCard from '../sharedComponent/HeaderCard'
import headerRecipe from '../assets/header-recipe.png'
import { categoriesApi } from '../api'
import NoData from './NoData'
import DeleteConfirmation from '../sharedComponent/DeleteConfirmation'
import AddCategoryModal from './AddCategoryModal'
import { toast } from 'react-toastify'

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
    }
  }

  const handleCategoryAdded = () => {
    getCategoriesList()
    setShowAddModal(false)
    toast.success('Category added successfully')
  }

  
  const handleEditClick = (category) => {
    setCategoryToEdit(category)
  }


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

      <div className='px-5 py-3 d-flex justify-content-between align-items-center'>
        <div>
          <h4>Categories Table Details</h4>
          <p>You can check all details</p>
        </div>
        <button className='btn btn-success' onClick={() => setShowAddModal(true)}>
          Add New Category
        </button>
      </div>

      <div className='px-5 py-3'>
        {categoriesList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Creation Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                   
                    <i
                      style={{ cursor: 'pointer' }}
                      className='fa fa-edit text-warning mx-2'
                      onClick={() => handleEditClick(category)}
                    ></i>
                    <i
                      style={{ cursor: 'pointer' }}
                      className='fa fa-trash text-danger'
                      onClick={() => handleDeleteClick(category)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <NoData />}
      </div>

      {/* Delete Modal */}
      <DeleteConfirmation
        show={!!selectedCategory}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        itemName={selectedCategory?.name}
      />

      {/* Add Modal */}
      <AddCategoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleCategoryAdded}
      />

      {/* 👇 Edit Modal */}
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