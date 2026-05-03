import axiosClient from "../axiosClient"


export const getAllRecipes = () => {
    return axiosClient.get('/Recipe')
}


export const deleteRecipe = (id) => {
    return axiosClient.delete(`/Recipe/${id}`)
}

export const addRecipe = (recipeData) => {
    return axiosClient.post('/Recipe', recipeData)
}

export const updateRecipe = (id, recipeData) => {
    return axiosClient.put(`/Recipe/${id}`, recipeData)
}