import axiosClient from "../axiosClient"


export const getAllRecipes = () => {
    return axiosClient.get('/Recipe')
}


export const deleteRecipe = (id) => {
    return axiosClient.delete(`/Recipe/${id}`)
}