import React, { Fragment, useEffect, useState } from 'react'
import HeaderCard from '../sharedComponent/HeaderCard'
import headerRecipe from '../assets/header-recipe.png'
import { categoriesApi } from '../api'
import NoData from './NoData'
const CategoriesList = () => {
  const [categoriesList, setCategoriesList] = useState([])

  const getCategoriesList = async () => {
    try {
      const response = await categoriesApi.getAllCategories()
      setCategoriesList(response.data.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const deleteCategory = async (id) => {
    try {
      await categoriesApi.deleteCategory(id)  
      setCategoriesList(categoriesList.filter(category => category.id !== id))
      getCategoriesList()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  useEffect(() => {
    getCategoriesList()
  }, [])

  return (
    <Fragment>
      <HeaderCard
       title={'Categories'}
       subtitle={'Item'}
       describtion1={'You can now add your items that any user can order '}
       describtion2={'it from the Application and you can edit'}
       image={headerRecipe}
       />
        <div className=' px-5 py-3 d-flex justify-content-between align-items-center '>
          <div>
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <button className='btn btn-success'>Add New Category</button>
        </div>
        <div className='px-5 py-3'>
          {categoriesList.length > 0 ? (
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"> Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category)=>
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td>
                  <i className='fa fa-edit text-warning mx-2'></i>
                  <i style={{cursor:'pointer'}}  className='fa fa-trash text-danger' onClick={() => deleteCategory(category.id)}></i>
                </td>
              </tr>
              )}
             
            </tbody>
          </table>
          ):<NoData/>}
        </div>
    </Fragment>
  )
}

export default CategoriesList