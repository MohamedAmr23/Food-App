import axiosClient from "../axiosClient";


export const getAllCategories = () => {
    return axiosClient.get('/Category')
}


export const deleteCategory = (id) => {
    return axiosClient.delete(`/Category/${id}`)
}

export const addCategory = (categoryData) => {
    return axiosClient.post('/Category', categoryData)
}
export const updateCategory = (id, categoryData) => {
    return axiosClient.put(`/Category/${id}`, categoryData)
}