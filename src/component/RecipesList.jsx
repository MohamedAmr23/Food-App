import React, { Fragment, useEffect, useState } from 'react'
import HeaderCard from '../sharedComponent/HeaderCard'
import headerRecipe from '../assets/header-recipe.png'
import { recipesApi } from '../api'
import NoData from './NoData'
import noImage from '../assets/no-data.png'
const RecipesList = () => {
  const [recipesList, setRecipesList] = useState([])

  const getRecipesList = async () => {
    try {
      const response = await recipesApi.getAllRecipes()
      setRecipesList(response.data.data) 
    } catch (error) {
      console.error('Error fetching recipes:', error)
    }
  }

  const deleteRecipe = async (id) => {
    try {
      await recipesApi.deleteRecipe(id)
      setRecipesList(recipesList.filter(recipe => recipe.id !== id))
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  useEffect(() => {
    getRecipesList()
  }, [])

  return (
    <Fragment>
      <HeaderCard
        title={'Recipes'}
        subtitle={'Item'}
        describtion1={'You can now add your items that any user can order '}
        describtion2={'it from the Application and you can edit'}
        image={headerRecipe}
      />

      <div className='px-5 py-3 d-flex justify-content-between align-items-center'>
        <div>
          <h4>Recipes Table Details</h4>
          <p>You can check all details</p>
        </div>
        <button className='btn btn-success'>Add New Recipe</button>
      </div>

      <div className='px-5 py-3'>
        {recipesList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe) =>
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>
                    {recipe.imagePath
                      ? <img src={recipe.imagePath} alt={recipe.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                      : <img src={noImage} alt="No image" className='table-img' />
                    }
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag?.name || '—'}</td>           
                  <td>
                    {recipe.category?.length > 0               
                      ? recipe.category.map(c => c.name).join(', ')
                      : '—'
                    }
                  </td>
                  <td>
                    <i className='fa fa-edit text-warning mx-2' style={{ cursor: 'pointer' }}></i>
                    <i className='fa fa-trash text-danger' style={{ cursor: 'pointer' }} onClick={() => deleteRecipe(recipe.id)}></i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : <NoData />}
      </div>
    </Fragment>
  )
}

export default RecipesList