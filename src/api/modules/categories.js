import axiosClient from "../axiosClient";


export const getAllCategories = () => {
    return axiosClient.get('/Category')
}


export const deleteCategory = (id) => {
    return axiosClient.delete(`/Category/${id}`)
}