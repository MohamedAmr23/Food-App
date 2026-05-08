import axiosClient from "../axiosClient"


export const getAllFavs = () => {
    return axiosClient.get('/userRecipe')
}

export const createFav = (recipeData) => {
    return axiosClient.post('/userRecipe', {
        recipeId: Number(recipeData.recipeId)  
    })
}

export const deleteFav = (id) => {
    return axiosClient.delete(`/userRecipe/${id}`)
}



