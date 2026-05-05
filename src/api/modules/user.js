import axiosClient from "../axiosClient"

export const getAllUser = (params) => {
  return axiosClient.get('/Users/', { params })
}

export const deleteUser = (id) => {
  return axiosClient.delete(`/Users/${id}`)
}