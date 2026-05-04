import axiosClient from "../axiosClient"

export const getAllUser = () => {
    return axiosClient.get('/userRecipe')
}

export const deleteUser = (id) => {
    return axiosClient.delete(`/userRecipe/${id}`)
}

export const addUser = (data) => {
    return axiosClient.post('/userRecipe', data)
}