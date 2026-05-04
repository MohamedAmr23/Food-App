import axiosClient from "../axiosClient"


export const getAllRecipes = () => {
    return axiosClient.get('/Recipe')
}


export const deleteRecipe = (id) => {
    return axiosClient.delete(`/Recipe/${id}`)
}

export const addRecipe = (recipeData, config = {}) => {
    return axiosClient.post('/Recipe', recipeData, config)
}

export const updateRecipe = (id, recipeData, config = {}) => {
    return axiosClient.put(`/Recipe/${id}`, recipeData, config)
}